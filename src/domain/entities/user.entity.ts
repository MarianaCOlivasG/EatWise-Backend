import { CustomerEntity } from "./customer.entity";
import { SellerEntity } from "./seller.entity";

export class UserEntity {

    constructor(
        public uid: string,
        public name: string,
        public username: string,
        public email: string,
        public phone: string,
        public password: string,
        public picture: string,
        public is_active: boolean,
        public is_online: boolean,
        public is_disabled: boolean,
        public is_google: boolean,
        public has_profile: boolean,
        public entity: string,
        public is_verified: boolean,
        public verification_code: string,
        public created_at: string,
        public updated_at: string,
        public profile: SellerEntity | CustomerEntity
    ) {}

}