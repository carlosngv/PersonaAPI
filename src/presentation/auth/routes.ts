import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";


export class AuthRoutes {
    static get routes() {
        const router = Router();
        const controller = new AuthController( new AuthService( new EmailService() ) );

        router.post( '/register', controller.register );
        router.post( '/login', controller.login );
        router.get( '/validate-token/:token', controller.validateToken );


        return router;
    }
}
