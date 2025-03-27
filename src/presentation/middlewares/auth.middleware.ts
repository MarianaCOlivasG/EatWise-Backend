import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { MySQLDatabase } from "../../data/mysql";
import { Customer, Seller, User } from "../../data/mysql/entities";
import { EntityTarget, QueryRunner } from "typeorm";

export class AuthMiddleware {

    static validateJwt = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers['authorization'];

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Invalid or missing accessToken' });
        }

        const { entity } = req.params;

        const accessToken = authorization.split(' ')[1];
        const queryRunner = MySQLDatabase.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            const payload = await JwtAdapter.validateToken<{ uid: string, entity: 'customer' | 'seller' }>(accessToken);
            if (!payload) {
                return res.status(401).json({ error: 'Invalid accessToken' });
            }

            const Entity = entity === 'seller' ? Seller : Customer;
           
            const user = await queryRunner.manager.findOne(User, {
                where: { uid: payload.uid, is_active: true },
                select: [
                    'uid', 'username', 'email', 'phone', 'password', 'is_active',
                    'is_online', 'is_disabled', 'is_google', 'created_at', 
                    'updated_at', 'has_profile', 'picture'
                ]
            });

            if (!user || !user.is_active || user.is_disabled) {
                return res.status(401).json({ error: user ? (user.is_disabled ? 'User disabled' : 'User inactive') : 'Invalid accessToken' });
            }

            const profile = await this.findProfile(queryRunner, Entity, payload.uid);
            const dataProfile = this.buildProfileData(profile, entity);

            delete user.password;

            req.body.user = { ...user, profile: dataProfile };
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        } finally {
            await queryRunner.release();
        }
    };

    static async findProfile(queryRunner: QueryRunner, Entity: EntityTarget<Seller | Customer>, userId: string) {
        return queryRunner.manager.findOne(Entity, {
            where: { id_user: userId, is_active: true },
            select: ['id', 'name', 'picture', 'is_completed']
        });
    }

    static buildProfileData(profile: any, entity: string) {
        if (!profile) return {};
        const { id, ...restProfile } = profile;
        return { ...restProfile, [`id_${entity}`]: id };
    }
}
