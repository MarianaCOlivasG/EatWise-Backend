import { UserEntity } from "./user.entity";

export class SellerEntity {

    constructor(
        public id: string,
        public name: string,
        public picture: string,
        public is_active: boolean,
        public is_disabled: boolean,
        public created_at: Date,
        public updated_at: Date,
        public user: UserEntity,
        public id_user: string,
    ) {}

}