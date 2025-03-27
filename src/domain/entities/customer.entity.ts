import { UserEntity } from "./user.entity";


export class CustomerEntity {

    constructor(
        public id: string,
        public name: string,
        public date_of_birth: string,
        public picture: string,
        public gender: string,
        public cooking_skill: string,
        public diet_type: string,
        public allergies: string,
        public is_completed: boolean,
        public is_active: boolean,
        public is_disabled: boolean,
        public created_at: Date,
        public updated_at: Date,
        public user: UserEntity,
        public id_user: string,
    ) {}

}