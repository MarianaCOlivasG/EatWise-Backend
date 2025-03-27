import { SendEmailDto } from "../dtos/email";



export abstract class EmailDatasource {

    abstract sendEmail( sendEmailDto: SendEmailDto ): Promise<void>;

}