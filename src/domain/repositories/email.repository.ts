import { SendEmailDto } from "../dtos/email";


export abstract class EmailRepository {

    abstract sendEmail( sendEmailDto: SendEmailDto ): Promise<void>;
    
}