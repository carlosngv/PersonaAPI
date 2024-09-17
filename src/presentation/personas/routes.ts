import { Router } from "express";
import { PersonaController } from "./controller";
import { PersonaService } from "../services/persona.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class PersonaRouter {

    static get routes() {

        const router = Router();

        const controller = new PersonaController( new PersonaService() );

        router.get( '/', controller.getPersonas );
        router.post( '/', [ AuthMiddleware.validateToken ], controller.createPersona );

        return router;

    }

}
