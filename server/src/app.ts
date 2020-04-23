import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import express, { NextFunction, Request, Response } from 'express';
import lusca from 'lusca';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { auth } from './controllers/auth';
import { pupils } from './controllers/pupils';
import { tutors } from './controllers/tutors';
import { users } from './controllers/users';
import logger from './util/logger';
import { ENVIRONMENT, MONGODB_URI, PORT } from './util/secrets';
import { isKorepetycjeUser, isAdmin } from './config/guards';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch((err) => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
        // process.exit();
    });

// Express configuration
app.set('port', PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * API routes.
 */
app.use('/api/korepetycje/pupils', isKorepetycjeUser, pupils);
app.use('/api/korepetycje/tutors', isKorepetycjeUser, tutors);
app.use('/api/users', isAdmin, users);

/**
 * Authentication routes
 */
app.use('/auth', auth);

/**
 * Angular app host.
 */
app.use(express.static(path.join(__dirname, '/../../client/dist'), { maxAge: 31557600000 }));
app.all('/*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(__dirname, '/../../client/dist') });
});

/**
 * Default error handler
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('', err);
    if (ENVIRONMENT === 'production') {
        res.status(500).json({ message: 'Server error' });
    } else {
        res.status(500).json({ message: 'Server error', raw: err });
    }
});

export default app;
