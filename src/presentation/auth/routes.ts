

import { Router } from "express";
import { AuthDatasourceImpl } from "../../infrastructure/datasources/index";
import { AuthRepositoryImpl, EmailRepositoryImpl } from "../../infrastructure/repositories";
import { AuthController } from "./controller";
import { EmailDatasourceImpl } from "../../infrastructure/datasources";
import { AuthMiddleware } from "../middlewares";


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const authDataSource = new AuthDatasourceImpl();
        const emailDataSource = new EmailDatasourceImpl();

        const authRepository = new AuthRepositoryImpl( authDataSource );
        const emailRepository = new EmailRepositoryImpl( emailDataSource );

        const controller = new AuthController( authRepository, emailRepository );

        router.post('/login', controller.login );
        router.post('/register', controller.register );
        router.get('/renew/:entity', [ AuthMiddleware.validateJwt ], controller.renew );
        router.put('/verify_account', controller.verifyAccount );

        return router;
    }


}