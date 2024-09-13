import { BcryptAdapter } from "../../adapters/bcrypt.adapter";
import { JWTAdapter } from "../../adapters/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../helpers/customErrors";


export class AuthService {

    // ! DI
    constructor(){}

    createUser = async ( registerUserDto: RegisterUserDto ) => {

        try {

            const dbUser = await UserModel.findOne({ email: registerUserDto.email });

            if( dbUser ) throw CustomError.badRequest(`User with email ${ registerUserDto.email } is already registered`);

            const newUser = new UserModel( registerUserDto );

            newUser.password = BcryptAdapter.hashPassword( registerUserDto.password );
            await newUser.save();

            const { password, ...userEntity} = UserEntity.fromObject( newUser );

            const token = await JWTAdapter.generateToken({ id: newUser.id });
            if( !token ) throw CustomError.internalError('Problems generating token');

            return {
                user: userEntity,
                token
            };


        } catch (error) {
            console.log( error );
            throw CustomError.internalError(`${ error }`);
        }

    }

    loginUser = async( loginUserDto: LoginUserDto ) => {


        try {
            const dbUser = await UserModel.findOne({ email: loginUserDto.email });
            if( !dbUser ) throw CustomError.badRequest(`User with email ${ loginUserDto.email } does not exists.`);

            const isValidPassword = BcryptAdapter.validatePassword( loginUserDto.password, dbUser.password );
            if( !isValidPassword ) throw CustomError.unauthorized('Incorrect email/password');

            const token = await JWTAdapter.generateToken( { id: dbUser.id });
            const { password, ...userEntity } = UserEntity.fromObject( dbUser );

            return {
                userEntity,
                token,
            }

        } catch (error) {
            throw CustomError.internalError(`${ error }`);
        }


    }

}
