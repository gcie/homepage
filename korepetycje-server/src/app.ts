import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import express, { NextFunction, Request, Response } from 'express';
import lusca from 'lusca';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { isAdmin, isAuthenticated, isManager } from './config/passport';
import { postLogin } from './controllers/auth';
import { delPupilById, getPupilById, getPupils, postPupils, putPupilById } from './controllers/pupils';
import { delTutorById, getTutorById, getTutors, postTutors, putTutorById } from './controllers/tutors';
import { delUserById, getUserById, getUsers, postUsers, putUserById } from './controllers/users';
import logger from './util/logger';
import { ENVIRONMENT, MONGODB_URI, PORT } from './util/secrets';

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
        useFindAndModify: false
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
 * Authentication routes
 */
app.post('/login', postLogin);

/**
 * API pupils routes.
 */
app.get('/api/pupils', isAuthenticated, getPupils);
app.post('/api/pupils', isManager, postPupils);
app.get('/api/pupils/:id', isAuthenticated, getPupilById);
app.put('/api/pupils/:id', isManager, putPupilById);
app.delete('/api/pupils/:id', isManager, delPupilById);

/**
 * API tutors routes.
 */
app.get('/api/tutors', isAuthenticated, getTutors);
app.post('/api/tutors', isManager, postTutors);
app.get('/api/tutors/:id', isAuthenticated, getTutorById);
app.put('/api/tutors/:id', isManager, putTutorById);
app.delete('/api/tutors/:id', isManager, delTutorById);

/**
 * API users routes.
 */
app.get('/api/users', isAdmin, getUsers);
app.post('/api/users', isAdmin, postUsers);
app.get('/api/users/:id', isAdmin, getUserById);
app.put('/api/users/:id', isAdmin, putUserById);
app.delete('/api/users/:id', isAdmin, delUserById);

/**
 * Angular app host.
 */
app.use(express.static(path.join(__dirname, '/../../korepetycje-client/dist'), { maxAge: 31557600000 }));
app.all('/*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(__dirname, '/../../korepetycje-client/dist') });
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
