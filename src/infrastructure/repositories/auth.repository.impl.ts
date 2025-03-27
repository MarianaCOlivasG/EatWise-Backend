import { AuthDatasource } from "../../domain/datasources";
import { LoginDto, RegisterDto, VerifyAccountDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories";


export class AuthRepositoryImpl implements AuthRepository {
    
    constructor( 
        private readonly dataSource: AuthDatasource
    ){}
    

    register(registerDto: RegisterDto): Promise<UserEntity> {
        return this.dataSource.register( registerDto );
    }

    login(loginDto: LoginDto): Promise<UserEntity> {
        return this.dataSource.login( loginDto );
    }

    verifyAccount(verifyAccountDto: VerifyAccountDto): Promise<boolean> {
        return this.dataSource.verifyAccount( verifyAccountDto );
    }

 

}