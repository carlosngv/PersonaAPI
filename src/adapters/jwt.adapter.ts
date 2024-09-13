import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';

export class JWTAdapter {

    static generateToken( payload: any ) {

        return new Promise( ( resolve ) => { // ? Isnt gonna be rejected
            jwt.sign( payload, envs.JWT_SEED, {
                expiresIn: '2h'
            }, ( error, token ) => {
                if( error ) resolve( null );

                resolve( token );
            });
        });

    }

    static validateToken<T>( token: string ): Promise<T | null> {
        return new Promise( ( resolve ) => {
            jwt.verify( token, envs.JWT_SEED, ( error, decoded ) => {
                if( error ) resolve( null );
                resolve( decoded as T );
            });
        } )
    }

}
