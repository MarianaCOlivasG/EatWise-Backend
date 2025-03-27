import { MySQLDatabase } from "../../data/mysql";
import { User } from "../../data/mysql/entities";


export const userConnected = async (uid: string) => {
    const queryRunner = MySQLDatabase.dataSource.createQueryRunner();
    await queryRunner.connect();
    const user = await queryRunner.manager.findOne(User, {
        where: { uid },
    });
    if (!user) return;
    user.is_online = true;
    await queryRunner.manager.save(user);
    await queryRunner.release();
};



export const userDisconnected = async (uid: string) => {
    const queryRunner = MySQLDatabase.dataSource.createQueryRunner();
    await queryRunner.connect();
    const user = await queryRunner.manager.findOne(User, {
        where: { uid },
    });
    if (!user) return;
    user.is_online = false;
    await queryRunner.manager.save(user);
    await queryRunner.release();
};
