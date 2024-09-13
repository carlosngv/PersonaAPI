import { Router } from "express";
import { PersonaRouter } from "./personas/routes";
import { AuthRoutes } from "./auth/routes";


export class Routes {

    static get routes() {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes );
        router.use('/api/personas', PersonaRouter.routes );

        return router;
    }
}
