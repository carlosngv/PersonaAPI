import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { handleError } from "../../helpers/handleError";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";


export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    register = ( req: Request, res: Response ) => {

        const [ error, registerUserDto ] = RegisterUserDto.create( req.body );

        if( error ) res.status( 400 ).json({ error });

        this.authService.createUser( registerUserDto! )
            .then( user => res.status(201).json( user ))
            .catch( error => handleError( error, res ));
    }

    login = ( req: Request, res: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.create( req.body );

        console.log(loginUserDto)

        if( error ) res.status(400).json({ error });

        this.authService.loginUser( loginUserDto! )
            .then( user => res.status(200).json( user ) )
            .catch( error => handleError( error, res ) );
    }

    validateToken = ( req: Request, res: Response ) => {

        const { token } = req.params;

        if( !token ) res.status(400).json({ error: 'Token not provided' });

        this.authService.validateTokenFromEmail( token )
            .then( resp => res.status(200).json( resp ) )
            .catch( error => handleError( error, res ) );

    }

}
