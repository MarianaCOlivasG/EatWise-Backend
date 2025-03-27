
import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { LoginDto, RegisterDto, VerifyAccountDto } from '../../domain/dtos/auth';
import { AuthRepository, EmailRepository } from '../../domain/repositories';
import { Renew } from '../../domain/use-cases/auth/renew.use-case';
import { LoginUser, VerifyAccount } from '../../domain/use-cases/auth';
import { RegisterUser } from '../../domain/use-cases/auth/register.use-case';

export class AuthController {

    constructor( 
        private readonly authRepository: AuthRepository,
        private readonly emailRepository: EmailRepository,
    ) 
    {}


    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error, message: error.message, status: false })
        }

        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }


    login = (req: Request, res: Response) => {
        const { role } = req.query;
        const [error, loginUserDto] = LoginDto.create({ ...req.body, role });
        if (error) return res.status(400).json({ error });

        new LoginUser(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    register = ( req: Request, res: Response ) => {
        const [error, registerDto] = RegisterDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        new RegisterUser(this.authRepository, this.emailRepository)
          .execute( registerDto! )
          .then( data => res.json(data) )
          .catch( error => this.handleError(error, res) );
    }


    renew = ( req: Request, res: Response ) => {
        
        const { entity } = req.params as { entity: "seller" | "customer" };
        
        if (entity !== "seller" && entity !== "customer") {
            return res.status(400).json({ error: "Only accept entity 'seller' or 'customer'" });
        }

        new Renew()
            .execute({ ...req.body.user }, entity )
            .then( data => res.json(data) )
            .catch( error => this.handleError(error, res) );

    }


    verifyAccount = ( req: Request, res: Response ) => {
        const [error, verifyAccountDto] = VerifyAccountDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        new VerifyAccount(this.authRepository )
          .execute( verifyAccountDto! )
          .then( data => res.json(data) )
          .catch( error => this.handleError(error, res) );
    }



}