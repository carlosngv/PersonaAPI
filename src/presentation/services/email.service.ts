import nodemailer from 'nodemailer';
import { envs } from '../../config/envs';
import { CustomError } from '../../helpers/customErrors';

interface Options {
    to: string;
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
  }

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    constructor() {}

    sendEmail = async ( options: Options ) => {

        const { to, subject, htmlBody, attachments = [] } = options;

        if( !envs.SEND_EMAIL ) return true;

        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            return true;
        } catch (error) {
            throw CustomError.internalError(`${ error }`);
        }


    }



}
