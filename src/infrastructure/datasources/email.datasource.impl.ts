import { transporter } from "../../config/mailer";
import { EmailDatasource } from "../../domain/datasources";
import { SendEmailDto } from "../../domain/dtos/email";
import { CustomError } from "../../domain/errors";


export class EmailDatasourceImpl implements EmailDatasource {


    async sendEmail( sendEmailDto: SendEmailDto ): Promise<void> {
        try {
            const { to, subject, template, context } = sendEmailDto;

            const mailOptions = {
                from: process.env.SMTP_USER, 
                to,
                subject,
                template,
                context
            };

            await transporter.sendMail(mailOptions);
            console.log("Correo enviado correctamente");

        } catch (error) {
            console.error("Error al enviar el correo:", error);
            throw CustomError.internalServer("Error al enviar el correo");
        }
    }
    


}