import { CompleteProfileDto, UpdateProfileDto } from "../../dtos/customer";
import { CustomerEntity } from "../../entities";
import { CustomerRepository } from "../../repositories";

interface Response {
    status: boolean;
    message: string;
    customer: CustomerEntity,
}

interface UpdateProfileCustomerUseCase {
  execute(  updateProfileDto: UpdateProfileDto ): Promise<Response>;
}


export class UpdateProfileCustomer implements UpdateProfileCustomerUseCase {

  constructor(
    private readonly customerRepository: CustomerRepository,
  ){}

  async execute( updateProfileDto: UpdateProfileDto  ): Promise<Response> {

    const customer = await this.customerRepository.updateProfile( updateProfileDto );

    return {
        status: true,
        message: 'Perfil actualizado con éxito.',
        customer,
    }

  }

}