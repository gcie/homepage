import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import compression from 'compression'; // compresses requests
import express, { NextFunction, Request, Response } from 'express';
import lusca from 'lusca';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { isAdmin } from './config/guards';
import { isAuthenticated } from './config/passport';
import { auth, jdoodle, pupils, tutors, user, users } from './controllers';
import { pythonCourse } from './controllers/python-course';
import logger from './util/logger';
import { DB_URI, ENVIRONMENT, PORT } from './util/secrets';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = DB_URI;
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
app.use('/api/korepetycje/pupils', pupils);
app.use('/api/korepetycje/tutors', tutors);
app.use('/api/users', isAdmin, users);
app.use('/api/user', isAuthenticated, user);
app.use('/api/jdoodle', isAuthenticated, jdoodle);
app.use('/api/python-course', pythonCourse);

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
