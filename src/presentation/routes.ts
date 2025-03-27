import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CustomerRoutes } from "./customer/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes );
        router.use("/api/customer", CustomerRoutes.routes);

        return router;
    }


}