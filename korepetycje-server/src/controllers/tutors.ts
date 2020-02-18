import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { Tutor } from '../models/Tutor';

export const getTutors = async (req: Request, res: Response, next: NextFunction) => {
    Tutor.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
};

export const postTutors = async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Email is not valid')
        .isEmail()
        .run(req);
    await check('name', 'Name cannot be blank')
        .isLength({ min: 1 })
        .run(req);

    var tutor = req.body;
    delete tutor._id;
    Tutor.create(tutor)
        .then((doc) => res.json(doc))
        .catch(next);
};

export const getTutorById = (req: Request, res: Response, next: NextFunction) => {
    Tutor.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};

export const putTutorById = (req: Request, res: Response, next: NextFunction) => {
    var tutor = req.body;
    delete tutor._id;
    Tutor.findByIdAndUpdate(req.params.id, tutor)
        .then(() => res.json(tutor))
        .catch(next);
};

export const delTutorById = (req: Request, res: Response, next: NextFunction) => {
    Tutor.findOneAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};
