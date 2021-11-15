"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pupils = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const Pupil_1 = require("../models/Pupil");
const Tutor_1 = require("../models/Tutor");
const guards_1 = require("./../config/guards");
exports.pupils = express_1.Router();
exports.pupils.get('/', (req, res, next) => {
    Pupil_1.Pupil.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
});
exports.pupils.post('/', guards_1.isKorepetycjeManager, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
        yield express_validator_1.check('name', 'Name cannot be blank').isLength({ min: 1 }).run(req);
        const pupil = req.body;
        delete pupil._id;
        delete pupil.assignedTutorId;
        delete pupil.assignedTutorName;
        const doc = yield Pupil_1.Pupil.create(pupil);
        return res.json(doc);
    }
    catch (err) {
        next(err);
    }
}));
exports.pupils.get('/:id', (req, res, next) => {
    Pupil_1.Pupil.findById(req.params.id)
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
exports.pupils.put('/:id', guards_1.isKorepetycjeManager, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield express_validator_1.check('name', 'Name cannot be blank').isLength({ min: 1 }).run(req);
        const pupilDoc = req.body;
        delete pupilDoc._id;
        const pupil = yield Pupil_1.Pupil.findById(req.params.id).exec();
        try {
            if (pupil.assignedTutorId && !pupilDoc.assignedTutorId) {
                const tutor = yield Tutor_1.Tutor.findById(pupil.assignedTutorId).exec();
                tutor.assignedPupilId = undefined;
                tutor.assignedPupilName = undefined;
                yield tutor.save();
                pupilDoc.assignedTutorName = undefined;
            }
            else if (!pupil.assignedTutorId && pupilDoc.assignedTutorId) {
                const tutor = yield Tutor_1.Tutor.findById(pupilDoc.assignedTutorId).exec();
                tutor.assignedPupilId = new mongoose_1.Types.ObjectId(req.params.id);
                tutor.assignedPupilName = pupilDoc.name;
                yield tutor.save();
                pupilDoc.assignedTutorName = tutor.name;
            }
            else if (pupil.assignedTutorId && pupilDoc.assignedTutorId && pupil.assignedTutorId !== pupilDoc.assignedTutorId) {
                const currentTutor = yield Tutor_1.Tutor.findById(pupil.assignedTutorId).exec();
                currentTutor.assignedPupilId = undefined;
                currentTutor.assignedPupilName = undefined;
                yield currentTutor.save();
                const tutor = yield Tutor_1.Tutor.findById(pupilDoc.assignedTutorId).exec();
                tutor.assignedPupilId = new mongoose_1.Types.ObjectId(req.params.id);
                tutor.assignedPupilName = pupilDoc.name;
                yield tutor.save();
                pupilDoc.assignedTutorName = tutor.name;
            }
            else {
                pupilDoc.assignedTutorName = undefined;
            }
        }
        catch (err) {
            pupilDoc.assignedTutorId = undefined;
            pupilDoc.assignedTutorName = undefined;
        }
        pupil.overwrite(pupilDoc);
        yield pupil.save();
        return res.json(pupil);
    }
    catch (err) {
        next(err);
    }
}));
exports.pupils.delete('/:id', guards_1.isKorepetycjeManager, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pupil = yield Pupil_1.Pupil.findById(req.params.id).exec();
        if (pupil.assignedTutorId) {
            const tutor = yield Tutor_1.Tutor.findById(pupil.assignedTutorId).exec();
            tutor.assignedPupilId = undefined;
            tutor.assignedPupilName = undefined;
            yield tutor.save();
        }
        return yield pupil.remove();
    }
    catch (err) {
        next(err);
    }
}));
//# sourceMappingURL=pupils.js.map