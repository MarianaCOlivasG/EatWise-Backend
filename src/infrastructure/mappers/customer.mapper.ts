import { CustomerEntity, UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

export class CustomerMapper {
 
    static customerntityFromObject(obj: { [key: string]: any }) {

        const { 
            id,
            name,
            date_of_birth,
            picture,
            gender,
            cooking_skill,
            diet_type,
            allergies,
            is_completed,
            is_active,
            is_disabled,
            created_at,
            updated_at,
            user,
            id_user,
        } = obj;

        if (!id) throw CustomError.badRequest(`'id' is missing`);
        if (!name) throw CustomError.badRequest(`'username' is missing`);

        return new CustomerEntity(
            id,
            name,
            date_of_birth,
            picture,
            gender,
            cooking_skill,
            diet_type,
            allergies,
            is_completed,
            is_active,
            is_disabled,
            created_at,
            updated_at,
            user,
            id_user,
        );
    }
}
