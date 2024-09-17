import { Validators } from "../../../config/validators";

export class CreatePersonaDto {
    private constructor(
        public name: string,
        public arcana: string,
        public level: string,
        public user: string,
    ){}

    static create( object: { [ key: string ]: any } ): [ string?, CreatePersonaDto? ] {

        // ? El user id se obtiene del request.
        // ? Para este punto el user ya se encuentra loggeado.

        const { name, arcana, level, user } = object;

        if( !name ) return ['Missing name'];
        if( !arcana ) return ['Missing arcana'];
        if( !level ) return ['Missing level'];
        if( !Validators.isMongoID( user ) ) return ['User id is not valid'];

        return [undefined, new CreatePersonaDto( name, arcana, level, user ) ];

    }

}
