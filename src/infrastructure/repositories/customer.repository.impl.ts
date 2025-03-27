import { CustomerDatasource } from "../../domain/datasources";
import { CompleteProfileDto } from "../../domain/dtos/customer";
import { CustomerRepository } from "../../domain/repositories";


export class CustomerRepositoryImpl implements CustomerRepository {
    
    constructor( 
        private readonly dataSource: CustomerDatasource
    ){}

    completeProfile( completeProfileDto: CompleteProfileDto): Promise<boolean> {
        return this.dataSource.completeProfile( completeProfileDto );
    }
  
}