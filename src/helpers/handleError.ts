import { Response } from "express";
import { CustomError } from "./customErrors";


export const handleError = ( error: any, res: Response ) => {

    if( error instanceof CustomError ) {
        return res.status( error.statusCode ).json({ error: error.message });
    }

    return res.status( 400 ).json({ error: 'Internal server error '});

}
