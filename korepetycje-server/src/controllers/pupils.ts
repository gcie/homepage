import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { Pupil } from '../models/Pupil';

export const getPupils = async (req: Request, res: Response, next: NextFunction) => {
    Pupil.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
};

export const postPupils = async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Email is not valid')
        .isEmail()
        .run(req);
    await check('name', 'Name cannot be blank')
        .isLength({ min: 1 })
        .run(req);

    var pupil = req.body;
    delete pupil._id;
    Pupil.create(pupil)
        .then((doc) => res.json(doc))
        .catch(next);
};

export const getPupilById = (req: Request, res: Response, next: NextFunction) => {
    Pupil.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};

export const putPupilById = async (req: Request, res: Response, next: NextFunction) => {
    await check('name', 'Name cannot be blank')
        .isLength({ min: 1 })
        .run(req);

    var pupil = req.body;
    delete pupil._id;
    Pupil.findByIdAndUpdate(req.params.id, pupil)
        .then(() => res.json(pupil))
        .catch(next);
};

export const delPupilById = (req: Request, res: Response, next: NextFunction) => {
    Pupil.findOneAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};
