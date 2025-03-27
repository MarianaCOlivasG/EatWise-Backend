
import { VerifyAccountDto } from "../../dtos/auth";
import { AuthRepository } from "../../repositories";

interface Response {
    status: boolean;
    message: string
}

interface VerifyAccountUseCase {
  execute( verifyAccountDto: VerifyAccountDto ): Promise<Response>;
}


export class VerifyAccount implements VerifyAccountUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
  ){}


  async execute( verifyAccountDto: VerifyAccountDto ): Promise<Response> {

    await this.authRepository.verifyAccount( verifyAccountDto );

    return {
      status: true,
      message: 'Cuenta verificada con éxito.'
    }

    

  }

}