import { Router } from "express";
import { PersonaController } from "./controller";


export class PersonaRouter {

    static get routes() {

        const router = Router();

        const controller = new PersonaController();

        router.get( '/', controller.getPersonas );

        return router;

    }

}
