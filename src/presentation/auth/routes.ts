import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";


export class AuthRoutes {
    static get routes() {
        const router = Router();
        const controller = new AuthController( new AuthService() );

        router.post( '/register', controller.register );
        router.post( '/login', controller.login );


        return router;
    }
}
