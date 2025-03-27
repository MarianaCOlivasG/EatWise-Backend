import { JwtAdapter } from "../../../config";
import { RegisterDto } from "../../dtos/auth";
import { SendEmailDto } from "../../dtos/email";
import { CustomError } from "../../errors";
import { AuthRepository, EmailRepository } from "../../repositories";


interface UserAccessToken {
    status: boolean;
    accessToken: string;
    user: {
        uid: string;
        username: string;
        is_online: boolean;
        picture?: string;
        profile?: any
    }
}
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


interface RegisterUserUseCase {
  execute( registerUserDto: RegisterDto ): Promise<UserAccessToken>;
}


export class RegisterUser implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailRepository: EmailRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}


  async execute( registerUserDto: RegisterDto ): Promise<UserAccessToken> {

    const user = await this.authRepository.register(registerUserDto);

    // Crear el correo de bienvenida
    const sendEmailDto: SendEmailDto = {
      to: user.email,
      subject: 'Bienvenido a nuestra tienda online',
      template: 'welcome',
      context: {
        name: user.profile?.name,
        verification_code: user.verification_code,
        url_site: process.env.URL_SITE,
        uid: user.uid
      }
    };

    // Enviar el correo de bienvenida
    await this.emailRepository.sendEmail(sendEmailDto);

    // AccessToken
    const accessToken = await this.signToken({ uid: user.uid });

    if ( !accessToken ) throw CustomError.internalServer('Error generating accessToken');

    return {
      status: true,
      accessToken,
      user: {
          uid: user.uid,
          username: user.username,
          is_online: user.is_online,
          picture: user.picture,
          profile: user.profile,
      }
    }

  }

}