import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../config/passport';
import { validate } from '../exercises/set01';
import { Exercise } from '../models/Exercise';
import logger from '../util/logger';

export const pythonCourse = Router();

pythonCourse.get('/exercise/:id', async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(req.params.id);
    Exercise.findOne({ id: req.params.id })
        .then((doc) => res.status(200).json(doc))
        .catch(next);
});

pythonCourse.post('/exercise/:id/submit', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    await check('program', 'Program nie może być pusty').notEmpty().run(req);
    logger.debug(`Submitted exercise: ${req.params.id}`);

    validate(req.params.id, req.body.program)
        .then((result) => {
            logger.debug('execution result: ' + result);
            res.status(200).json(result);
        })
        .catch(next);
});
