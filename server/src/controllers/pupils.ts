import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { Types } from 'mongoose';
import { isManager } from '../config/passport';
import { Pupil } from '../models/Pupil';
import { Tutor } from '../models/Tutor';

export const pupils = Router();

pupils.get('/', (req: Request, res: Response, next: NextFunction) => {
    Pupil.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
});

pupils.post('/', isManager, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await check('email', 'Email is not valid')
            .isEmail()
            .run(req);
        await check('name', 'Name cannot be blank')
            .isLength({ min: 1 })
            .run(req);

        const pupil = req.body;
        delete pupil._id;
        delete pupil.assignedTutorId;
        delete pupil.assignedTutorName;
        const doc = await Pupil.create(pupil);
        return res.json(doc);
    } catch (err) {
        next(err);
    }
});

pupils.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Pupil.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});

// export const postPupilAssignTutor = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const pupil = await Pupil.findById(req.params.pupilId).exec();
//         if (pupil.assignedTutorId) {
//             const tutor = await Tutor.findById(req.params.tutorId).exec();
//             tutor.assignedPupilId = undefined;
//             tutor.assignedPupilName = undefined;
//             await tutor.save();
//             pupil.assignedTutorName = undefined;
//         }
//     }
// }

pupils.put('/:id', isManager, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await check('name', 'Name cannot be blank')
            .isLength({ min: 1 })
            .run(req);

        const pupilDoc = req.body;
        delete pupilDoc._id;
        const pupil = await Pupil.findById(req.params.id).exec();
        try {
            if (pupil.assignedTutorId && !pupilDoc.assignedTutorId) {
                const tutor = await Tutor.findById(pupil.assignedTutorId).exec();
                tutor.assignedPupilId = undefined;
                tutor.assignedPupilName = undefined;
                await tutor.save();
                pupilDoc.assignedTutorName = undefined;
            } else if (!pupil.assignedTutorId && pupilDoc.assignedTutorId) {
                const tutor = await Tutor.findById(pupilDoc.assignedTutorId).exec();
                tutor.assignedPupilId = new Types.ObjectId(req.params.id);
                tutor.assignedPupilName = pupilDoc.name;
                await tutor.save();
                pupilDoc.assignedTutorName = tutor.name;
            } else if (pupil.assignedTutorId && pupilDoc.assignedTutorId && pupil.assignedTutorId !== pupilDoc.assignedTutorId) {
                const currentTutor = await Tutor.findById(pupil.assignedTutorId).exec();
                currentTutor.assignedPupilId = undefined;
                currentTutor.assignedPupilName = undefined;
                await currentTutor.save();

                const tutor = await Tutor.findById(pupilDoc.assignedTutorId).exec();
                tutor.assignedPupilId = new Types.ObjectId(req.params.id);
                tutor.assignedPupilName = pupilDoc.name;
                await tutor.save();
                pupilDoc.assignedTutorName = tutor.name;
            } else {
                pupilDoc.assignedTutorName = undefined;
            }
        } catch (err) {
            pupilDoc.assignedTutorId = undefined;
            pupilDoc.assignedTutorName = undefined;
        }
        pupil.overwrite(pupilDoc);
        await pupil.save();
        return res.json(pupil);
    } catch (err) {
        next(err);
    }
});

pupils.delete('/:id', isManager, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pupil = await Pupil.findById(req.params.id).exec();
        if (pupil.assignedTutorId) {
            const tutor = await Tutor.findById(pupil.assignedTutorId).exec();
            tutor.assignedPupilId = undefined;
            tutor.assignedPupilName = undefined;
            await tutor.save();
        }
        return await pupil.remove();
    } catch (err) {
        next(err);
    }
});
