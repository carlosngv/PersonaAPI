import { CustomError } from "../../helpers/customErrors";

export class UserEntity {

    private constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public isVerified: boolean,
    ) {}

    static fromObject( object: { [ key: string ]: any } ) {

        const { id, username, email, password, isVerified = false } = object;

        if ( !id ) throw CustomError.badRequest('Missing id');
        if ( !username ) throw CustomError.badRequest('Missing username');
        if ( !email ) throw CustomError.badRequest('Missing email');
        if ( !password ) throw CustomError.badRequest('Missing password');

        // todo: validate email

        return new UserEntity( id, username, email, password, isVerified );
    }

}
