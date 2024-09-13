

export class RegisterUserDto {

    private constructor(
        public username: string,
        public email: string,
        public password: string,
    ) {}

    // ? El DTO transporata data necesaria del cliente al backend
    static create( object: { [ key: string ]: any } ): [ string?, RegisterUserDto? ] {

        const { username, email, password } = object;

        if ( !username ) return ['Missing username'];
        if ( !email ) return ['Missing email'];
        if ( !password ) return ['Missing password'];

        return [ undefined, new RegisterUserDto( username, email, password ) ];
    }

}
