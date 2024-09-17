import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../adapters/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthMiddleware {


    static async validateToken( req: Request, res: Response, next: NextFunction ) {

        const { authorization } = req.headers;

        if( !authorization ) return res.status(401).json({ error: 'Token is required' });


        const token = authorization?.split(' ')[1];


        try {
            const payload = await JWTAdapter.validateToken<{ id: string }>( token as string );
            if( !payload ) return res.status(401).json({ error: 'Token is not valid' });

            const { id } = payload as { id: string };
            if( !id ) return res.status(401).json({ error: 'Token is not valid' });

            const dbUser = await UserModel.findById( id );
            if( !dbUser ) return res.status(500).json({ error: 'Contact your administrator' });

            const { password, ...user} = UserEntity.fromObject( dbUser );

            if( !user.isVerified ) return res.status(400).json({ error: 'User must be verified.'});

            req.body.user = user;

        } catch (error) {
            res.status(500).json({ error });
        }

        next();
    }

}
