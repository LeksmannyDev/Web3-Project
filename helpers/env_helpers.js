import dotenv from "dotenv";
import crypto from 'crypto';
dotenv.config();

const env = process.env;

const SECRET_INIT = env.SECRET_INIT;
const INIT_VECTOR = env.INIT_VECTOR;
const log = console.log;

export const decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv('aes256', SECRET_INIT, INIT_VECTOR);
    let decrypted = decipher.update(encrypted.toString(), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

export { SECRET_INIT, INIT_VECTOR, log };

