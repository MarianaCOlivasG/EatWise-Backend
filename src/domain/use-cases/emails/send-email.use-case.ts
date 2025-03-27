import { SendEmailDto } from "../../dtos/email";
import { EmailRepository } from "../../repositories";


interface Response {
    status: boolean;
    message: string;
}

interface SendEmailUseCase {
  execute( sendEmailDto: SendEmailDto ): Promise<Response>;
}



export class CreateOrder implements SendEmailUseCase {

  constructor(
    private readonly orderRepository: EmailRepository,
  ){}


  async execute( sendEmailDto: SendEmailDto  ): Promise<Response> {

    await this.orderRepository.sendEmail( sendEmailDto );

    return {
      status: true,
      message: 'Correo electrónico enviado con éxito.',
    }

  }

}