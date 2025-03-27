import { CompleteProfileDto } from "../../dtos/customer";
import { CustomerEntity } from "../../entities";
import { CustomerRepository } from "../../repositories";

interface Response {
    status: boolean;
    message: string;
}

interface CompleteProfileCustomerUseCase {
  execute(  CompleteProfileDto: CompleteProfileDto ): Promise<Response>;
}


export class CompleteProfileCustomer implements CompleteProfileCustomerUseCase {

  constructor(
    private readonly customerRepository: CustomerRepository,
  ){}

  async execute( completeProfileDto: CompleteProfileDto  ): Promise<Response> {

    await this.customerRepository.completeProfile( completeProfileDto );

    return {
        status: true,
        message: 'Perfil completado con éxito.',
        // customer,
    }

  }

}