import { PersonaModel } from "../../data/mongo/models/persona.model";
import { CreatePersonaDto } from "../../domain/dtos/personas/create-persona.dto";
import { PersonaEntity } from "../../domain/entities/persona.entity";
import { CustomError } from "../../helpers/customErrors";


export class PersonaService {

    // ? DI
    constructor() {}

    getPersonas = async() => {
        try {

            let personas = await PersonaModel.find();

            if( !personas ) {
                personas = [];
            }

            return {
                personas,
            }

        } catch (error) {
            throw CustomError.internalError(`${ error }`);
        }
    }

    createPersona = async ( createPersonaDto: CreatePersonaDto ) => {

        try {
            const dbPersona = new PersonaModel( createPersonaDto);

            await dbPersona.save();

            const personaEntity = PersonaEntity.fromObject( dbPersona );

            return {
                persona: personaEntity,
                msg: 'Persona successfully created',
            }

        } catch (error) {
            throw CustomError.internalError(`${ error }`);
        }

    }

}
