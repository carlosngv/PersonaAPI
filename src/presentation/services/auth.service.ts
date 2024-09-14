import { BcryptAdapter } from "../../adapters/bcrypt.adapter";
import { JWTAdapter } from "../../adapters/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../helpers/customErrors";
import { EmailService } from "./email.service";


export class AuthService {

    // ! DI
    constructor(
        private emailService: EmailService
    ){}

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

            this.sendValidationEmail( newUser.email );

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

    validateTokenFromEmail = async( token: string ) => {

        if( token.length === 0 ) throw CustomError.badRequest('Token not provided.');

        try {
            const payload = await JWTAdapter.validateToken<{ email: string }>( token );
            const { email } = payload as { email: string };
            if( !email ) throw CustomError.unauthorized('Token is not valid');

            const dbUser = await UserModel.findOne( { email } );
            if( !dbUser ) throw CustomError.internalError('User is not registered');

            dbUser.isVerified = true;

            await dbUser.save();

            return {
                user: dbUser,
            };

        } catch (error) {
            throw CustomError.internalError(`${ error }`);
        }
    }

    sendValidationEmail = async( email: string ) => {

        const token = await JWTAdapter.generateToken({ email });

        const validationLink = `http://localhost:3200/api/auth/validate-token/${ token }`;

        const emailSent = this.emailService.sendEmail({
            to: email,
            subject: 'Welcome to the PersonaAPI!',
            htmlBody: `
                <p>Thanks for registering into the PersonaAPI.</p>
                <strong>PERSONAAAAA!</strong>
                <br>
                <br>
                <a href="${validationLink}">Click here to validate your account!</a>
            `
        });

        if( !emailSent ) throw CustomError.internalError('Problems sending validation email. Contact your administrator.');


    }

}
