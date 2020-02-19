import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { Pupil } from '../models/Pupil';
import { Tutor } from '../models/Tutor';
import { promisify } from 'bluebird';

export const getPupils = async (req: Request, res: Response, next: NextFunction) => {
    Pupil.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
};

export const postPupils = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await check('email', 'Email is not valid')
            .isEmail()
            .run(req);
        await check('name', 'Name cannot be blank')
            .isLength({ min: 1 })
            .run(req);

        const pupil = req.body;
        delete pupil._id;
        if (pupil.assignedTutorId) {
            try {
                const tutor = await Tutor.findById(pupil.assignedTutorId).exec();
                pupil.assignedTutorName = tutor.name;
            } catch {
                pupil.assignedTutorName = null;
                pupil.assignedTutorId = null;
            }
        } else {
            pupil.assignedTutorName = null;
        }
        const doc = await Pupil.create(pupil);
        return res.json(doc);
    } catch (err) {
        next(err);
    }
};

export const getPupilById = (req: Request, res: Response, next: NextFunction) => {
    Pupil.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};

export const putPupilById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await check('name', 'Name cannot be blank')
            .isLength({ min: 1 })
            .run(req);

        const pupil = req.body;
        delete pupil._id;
        if (pupil.assignedTutorId) {
            try {
                const tutor = await Tutor.findById(pupil.assignedTutorId).exec();
                pupil.assignedTutorName = tutor.name;
            } catch {
                pupil.assignedTutorName = null;
                pupil.assignedTutorId = null;
            }
        } else {
            pupil.assignedTutorName = null;
        }
        await Pupil.findByIdAndUpdate(req.params.id, pupil).exec();
        return res.json(pupil);
    } catch (err) {
        next(err);
    }
};

export const delPupilById = (req: Request, res: Response, next: NextFunction) => {
    Pupil.findOneAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};
