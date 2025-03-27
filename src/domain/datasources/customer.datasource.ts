
import { CompleteProfileDto } from "../dtos/customer";


export abstract class CustomerDatasource {

    abstract completeProfile( completeProfileDto: CompleteProfileDto ): Promise<boolean>

}