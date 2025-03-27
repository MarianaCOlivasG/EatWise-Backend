import { JwtAdapter } from "../../../config";
import { LoginDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories";


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


interface LoginUserUseCase {
  execute( registerUserDto: LoginDto ): Promise<UserAccessToken>;
}


export class LoginUser implements LoginUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}


  async execute( loginUserDto: LoginDto ): Promise<UserAccessToken> {
    const user = await this.authRepository.login(loginUserDto);

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