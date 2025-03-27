import { MySQLDatabase } from "../../data/mysql";
import { Customer } from "../../data/mysql/entities";
import { User } from "../../data/mysql/entities/user.entity";
import { CustomerDatasource } from "../../domain/datasources";
import { CustomerEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { CustomerMapper } from "../mappers";
import { CompleteProfileDto } from "../../domain/dtos/customer";

export class CustomerDatasourceImpl implements CustomerDatasource {
    
    
    async completeProfile( completeProfileDto: CompleteProfileDto ): Promise<boolean> {
        
        const {
            uid,
            gender,
            date_of_birth,
            cooking_skill,
            diet_type,            
            allergies,
        } = completeProfileDto;

        const queryRunner = MySQLDatabase.dataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            
            await queryRunner.startTransaction();

            const userdb = await queryRunner.manager.findOne(User, {
                where: { uid }
            });

            if (!userdb) {
                throw CustomError.notFound(`No existe un usuario con el id '${uid}'`);
            }

            const customerDb = await queryRunner.manager.findOne(Customer, {
                where: { id_user: uid }
            });

            if ( !customerDb ) {
                throw CustomError.notFound(`No existe un perfil del usuario con el id '${uid}'`);
            }

            customerDb.allergies = allergies;
            customerDb.gender = gender;
            customerDb.date_of_birth = date_of_birth;
            customerDb.cooking_skill = cooking_skill;
            customerDb.diet_type = diet_type;
            customerDb.user = userdb;
            customerDb.is_completed = true;
            
            await queryRunner.manager.save(Customer, customerDb);

            await queryRunner.commitTransaction();

            // return CustomerMapper.customerntityFromObject(customer);
            return true;

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

}
