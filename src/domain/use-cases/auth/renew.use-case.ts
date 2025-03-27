import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors";

interface User {
  uid: string;
  username: string;
  is_online: boolean;
  picture?: string;
  profile?: any
}

interface UserAccessToken {
  status: boolean;
  accessToken: string;
  user: User
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;


interface RenewUseCase {
  execute( user: User, entity: 'customer' | 'seller' ): Promise<UserAccessToken>;
}


export class Renew implements RenewUseCase {

  constructor(
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ){}


  async execute( user: User, entity: 'customer' | 'seller' ): Promise<UserAccessToken> {

    const accessToken = await this.signToken({ uid: user.uid, entity });

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