import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.debug('Using .env.example file to supply config environment variables');
    dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_URI = prod ? process.env.DB_URI : process.env.DB_URI_LOCAL;
export const PORT = process.env.PORT || 8080;

if (!JWT_SECRET) {
    logger.error('No client secret. Set JWT_SECRET environment variable.');
    process.exit(1);
}

if (!DB_URI) {
    if (prod) {
        logger.error('No mongo connection string. Set DB_URI environment variable.');
    } else {
        logger.error('No mongo connection string. Set DB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}

export const JDOODLE_CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
export const JDOODLE_CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;
