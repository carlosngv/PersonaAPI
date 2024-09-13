import { Request, Response } from "express";


export class PersonaController {

    // todo: DI service
    constructor() {}

    getPersonas = ( req: Request, res: Response ) => {
        res.status(200).json('Get personas');
    }


}
