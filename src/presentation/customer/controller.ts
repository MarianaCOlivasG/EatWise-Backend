
import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { CustomerRepository } from '../../domain/repositories';
import { CompleteProfileCustomer } from '../../domain/use-cases/customer';
import { CompleteProfileDto } from '../../domain/dtos/customer';

export class CustomerController {

    constructor( 
        private readonly customerRepository: CustomerRepository
    ) 
    {}

    private handleError = ( error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status(error.statusCode).json({ error, message: error.message, status: false })
        }
        console.log(error); // Winston
        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }

    completeProfile = (req: Request, res: Response) => {

        const [error, completeProfileDto] = CompleteProfileDto.create(req.body);
        if ( error ) return res.status(400).json({ error });

        new CompleteProfileCustomer(this.customerRepository)
            .execute( completeProfileDto! )
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }


}