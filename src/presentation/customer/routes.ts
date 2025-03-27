

import { Router } from "express";
import { CustomerController } from "./controller";
import { CustomerDatasourceImpl } from "../../infrastructure/datasources";
import { CustomerRepositoryImpl } from "../../infrastructure/repositories/customer.repository.impl";
import multer from "multer";


export class CustomerRoutes {

    static get routes(): Router {

        const router = Router();
        
        const dataSource = new CustomerDatasourceImpl();
        const customerRepository = new CustomerRepositoryImpl( dataSource );

        const controller = new CustomerController( customerRepository );

        router.post('/complete_profile', controller.completeProfile );

        return router;
    }


}