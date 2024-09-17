import { Request, Response } from "express";
import { CreatePersonaDto } from "../../domain/dtos/personas/create-persona.dto";
import { PersonaService } from "../services/persona.service";
import { handleError } from "../../helpers/handleError";


export class PersonaController {

    // todo: DI service
    constructor(
        private personaService: PersonaService,
    ) {}

    getPersonas = ( req: Request, res: Response ) => {
        this.personaService.getPersonas()
        .then( personas => res.status(200).json( personas ))
        .catch( error => handleError( error, res ));
    }

    createPersona = ( req: Request, res: Response ) => {

        const [ error, createPersonaDto ] = CreatePersonaDto.create( { ...req.body, user: req.body.user.id } );

        console.log(createPersonaDto)

        if( error ) res.status( 400 ).json({ error });

        this.personaService.createPersona( createPersonaDto! )
            .then( persona => res.status(201).json( persona ))
            .catch( error => handleError( error, res ));
    }


}
