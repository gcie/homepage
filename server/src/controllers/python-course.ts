import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../config/passport';
import { validate } from '../exercises/validate';
import { Exercise } from '../models/Exercise';
import { ExerciseSubmission } from '../models/ExerciseSubmission';
import { UserDocument } from '../models/User';
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

    const result = await validate(req.params.id, req.body.program);

    const doc = result as any;
    doc.exerciseId = req.params.id;
    doc.program = req.body.program;
    doc.userId = (req.user as UserDocument)._id;
    delete doc._id;

    res.status(200).json(result);

    ExerciseSubmission.create(doc);
});
