import 'dotenv/config';
import env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DATABASE: env.get('MONGO_DATABASE').required().asString(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),
    JWT_EXP_TIME: env.get('JWT_EXP_TIME').required().asInt(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    SEND_EMAIL: env.get('SEND_EMAIL').required().asBool(),
}
