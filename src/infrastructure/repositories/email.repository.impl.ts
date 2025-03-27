import { EmailDatasource } from "../../domain/datasources";
import { SendEmailDto } from "../../domain/dtos/email";
import { EmailRepository } from "../../domain/repositories";

export class EmailRepositoryImpl implements EmailRepository {
    
    constructor( 
        private readonly dataSource: EmailDatasource
    ){}

    sendEmail( sendEmailDto: SendEmailDto ): Promise<void> {
        return this.dataSource.sendEmail( sendEmailDto );
    }

   
}