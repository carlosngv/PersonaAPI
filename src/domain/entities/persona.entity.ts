import { CustomError } from "../../helpers/customErrors";


export class PersonaEntity {

    private constructor(
        public name: string,
        public arcana: string,
        public level: string,
        public user: string,
    ) {}


    static fromObject( object: { [ key: string ]: any }) {

        const { name, arcana, level, user } = object;

        if( !name ) throw CustomError.badRequest('Missing name');
        if( !arcana ) throw CustomError.badRequest('Missing arcana');
        if( !level ) throw CustomError.badRequest('Missing level');
        if( !user ) throw CustomError.badRequest('Missing user');

        return new PersonaEntity(name, arcana, level, user);

    }

}
