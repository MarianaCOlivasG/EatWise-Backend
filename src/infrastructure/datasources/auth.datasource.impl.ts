import { QueryRunner, EntityTarget } from "typeorm";
import { BcryptAdapter } from "../../config";
import { MySQLDatabase } from "../../data/mysql";
import { Customer, Seller } from "../../data/mysql/entities";
import { User } from "../../data/mysql/entities/user.entity";
import { AuthDatasource } from "../../domain/datasources";
import { LoginDto, RegisterDto, VerifyAccountDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { UserMapper } from "../mappers";


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {}

    async login(loginDto: LoginDto): Promise<UserEntity> {
        const { email, password, entity } = loginDto;

        const queryRunner = MySQLDatabase.dataSource.createQueryRunner();
        await queryRunner.connect();
        
        try {
            const user = await this.findUser(queryRunner, email);

            if (!user) {
                throw CustomError.badRequest(`Credenciales incorrectas.`);
            }

            this.validatePassword(password, user.password!);

            const Entity = entity === 'seller' ? Seller : Customer;
            const profile = await this.findProfile(queryRunner, Entity, user.uid);

            await queryRunner.release();

            const data_profile = this.buildProfileData(profile, entity);
            return UserMapper.userEntityFromObject({ ...user, profile: { ...data_profile } });

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    private async findUser(queryRunner: QueryRunner, username: string) {
        return await queryRunner.manager.findOne(User, {
            where: [
                { username: username.toLowerCase(), is_active: true },
                { email: username.toLowerCase(), is_active: true }
            ],
            select: {
                uid: true,
                username: true,
                email: true,
                phone: true,
                password: true,
                is_active: true,
                is_online: true,
                is_disabled: true,
                is_google: true,
                created_at: true,
                updated_at: true,
                has_profile: true,
                picture: true,
            }
        });
    }

    private validatePassword(password: string, hashedPassword: string) {
        const isMatching = this.comparePassword(password, hashedPassword);
        if (!isMatching) {
            throw CustomError.badRequest('Credenciales incorrectas.');
        }
    }

    private async findProfile(queryRunner: QueryRunner, Entity: EntityTarget<Seller | Customer>, userId: string) {
        return await queryRunner.manager.findOne(Entity, {
            where: { id_user: userId },
            select: {
                id: true,
                name: true,
                picture: true,
                is_completed: true
            }
        });
    }

    private buildProfileData(profile: any, entity: string) {
        let data_profile = {};
        if (profile) {
            const { id, ...restProfile } = profile;
            data_profile = { ...restProfile, [`id_${entity}`]: id };
        }
        return data_profile;
    }

    async register( registerUserDto: RegisterDto ): Promise<UserEntity> {
        const { name, email, password, entity } = registerUserDto;
    
        const queryRunner = MySQLDatabase.dataSource.createQueryRunner();
        await queryRunner.connect();
    
        try {
            await queryRunner.startTransaction();
    
            const userdb = await queryRunner.manager.findOne(User, {
                where: [
                    { username: email.toLowerCase() },
                    { email: email.toLowerCase() }
                ],
            });
    
            if (userdb) {
                throw CustomError.badRequest(`Ya existe un usuario con el email '${email.toLowerCase()}'`);
            }
    
            const user = queryRunner.manager.create(User, {
                name,
                username: email,
                email,
                password: this.hashPassword(password),
                entity,
                verification_code: this.generarCodigoVerificacion()
            });
    
            await queryRunner.manager.save(user);
    
            const ProfileEntity = entity === 'seller' ? Seller : Customer;
            const profile = await this.createProfile(queryRunner, ProfileEntity, {
                name, 
                id_user: user.uid,
            });
            await queryRunner.commitTransaction();
            
            const data_profile = this.buildProfileData(profile, entity);

            return UserMapper.userEntityFromObject({ ...user, profile: { ...data_profile } });
    
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        } finally {
            await queryRunner.release();
        }
    }
    
    private async createProfile(
        queryRunner: QueryRunner,
        ProfileEntity: EntityTarget<Seller | Customer>,
        data: { name: string; id_user: string }
    ) {
        const { name, id_user } = data;
        const profile = queryRunner.manager.create(ProfileEntity, {
            name, 
            id_user 
        });
        await queryRunner.manager.save(profile);
        return profile;
    }
    

    generarCodigoVerificacion(): string {
        return String(Math.floor(100000 + Math.random() * 900000));
    }


    async verifyAccount(verifyAccountDto: VerifyAccountDto): Promise<boolean> {
        const { uid, verification_code } = verifyAccountDto;
    
        const queryRunner = MySQLDatabase.dataSource.createQueryRunner();
        await queryRunner.connect();
    
        try {
            await queryRunner.startTransaction();
    
            const user = await queryRunner.manager.findOne(User, {
                where: {
                    uid,
                    verification_code,
                    is_verified: false
                },
            });
    
            if (!user) {
                throw CustomError.badRequest("Credenciales incorrectas.");
            }

            user.is_verified = true;
            user.verification_code = null;

            await queryRunner.manager.save(user);
    
            await queryRunner.commitTransaction();
    
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("Error verifying account:", error);
            
            if (error instanceof CustomError) {
                throw error;
            }
            
            throw CustomError.internalServer();
        } finally {
            await queryRunner.release();
        }
    }
    

 
}
