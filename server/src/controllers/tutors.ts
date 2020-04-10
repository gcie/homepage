import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { isKorepetycjeManager } from '../config/guards';
import { Tutor } from '../models/Tutor';

export const tutors = Router();

tutors.get('/', (req: Request, res: Response, next: NextFunction) => {
    const conditions: any = {};
    if (req.query.onlyFree) {
        conditions.assignedPupilId = null;
    }
    Tutor.find(conditions)
        .then((doc) => res.status(200).json(doc))
        .catch(next);
});

tutors.post('/', isKorepetycjeManager, async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Email is not valid')
        .isEmail()
        .run(req);
    await check('name', 'Name cannot be blank')
        .isLength({ min: 1 })
        .run(req);

    const tutor = req.body;
    delete tutor._id;
    Tutor.create(tutor)
        .then((doc) => res.json(doc))
        .catch(next);
});

tutors.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Tutor.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});

tutors.put('/:id', isKorepetycjeManager, (req: Request, res: Response, next: NextFunction) => {
    const tutor = req.body;
    delete tutor._id;
    Tutor.findByIdAndUpdate(req.params.id, tutor)
        .then(() => res.json(tutor))
        .catch(next);
});

tutors.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    Tutor.findByIdAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});
