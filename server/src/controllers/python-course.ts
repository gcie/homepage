import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../config/passport';
import { validate } from '../exercises/validate';
import { Exercise } from '../models/Exercise';
import { ExerciseSubmission } from '../models/ExerciseSubmission';
import { UserDocument } from '../models/User';
import logger from '../util/logger';

export const pythonCourse = Router();

pythonCourse.get('/exercise/:id', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(req.params.id);

    const user = req.user as UserDocument;

    const exercise = await Exercise.findOne({ id: req.params.id });
    const solution = await ExerciseSubmission.find({ exerciseId: req.params.id, userId: user._id, score: { $gt: 0 } }).sort({ score: -1 });

    res.status(200).json(
        Object.assign(exercise.toJSON(), {
            score: solution.length > 0 ? solution[0].score : 0,
            done: solution.length > 0 && solution[0].score === exercise.maxPoints,
        })
    );
});

pythonCourse.post('/exercise/:id/submit', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    await check('program', 'Program nie może być pusty').notEmpty().run(req);
    logger.debug(`Submitted exercise: ${req.params.id}`);

    const exercise = await Exercise.findOne({ id: req.params.id });

    const result = await validate(req.params.id, req.body.program);

    const doc = result as any;
    doc.exerciseId = req.params.id;
    doc.program = req.body.program;
    doc.userId = (req.user as UserDocument)._id;
    doc.done = result.score === exercise.maxPoints;
    delete doc._id;

    res.status(200).json(result);

    ExerciseSubmission.create(doc);
});
