import {  LoginDto, RegisterDto, VerifyAccountDto } from "../dtos/auth";
import { UserEntity } from "../entities";


export abstract class AuthDatasource {

    abstract login( loginDto: LoginDto ): Promise<UserEntity>

    abstract renew?(): Promise<UserEntity>

    abstract register( registerDto: RegisterDto ): Promise<UserEntity>

    abstract verifyAccount( verifyAccountDto: VerifyAccountDto ): Promise<boolean>
    
}