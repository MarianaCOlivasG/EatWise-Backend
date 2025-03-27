import { CompleteProfileDto } from "../dtos/customer";

export abstract class CustomerRepository {
    
    abstract completeProfile( completeProfileDto: CompleteProfileDto ): Promise<boolean>

}