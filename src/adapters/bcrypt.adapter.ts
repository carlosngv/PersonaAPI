import bcrypt from 'bcrypt';

export class BcryptAdapter {

    static hashPassword( password: string ): string {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync( password, salt );
        return hashedPassword;
    }

    static validatePassword( password: string, hashedPassword: string ): boolean {
        return bcrypt.compareSync( password, hashedPassword );
    }

}
