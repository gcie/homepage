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
exports.tutors = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const guards_1 = require("../config/guards");
const Tutor_1 = require("../models/Tutor");
exports.tutors = express_1.Router();
exports.tutors.get('/', (req, res, next) => {
    const conditions = {};
    if (req.query.onlyFree) {
        conditions.assignedPupilId = null;
    }
    Tutor_1.Tutor.find(conditions)
        .then((doc) => res.status(200).json(doc))
        .catch(next);
});
exports.tutors.post('/', guards_1.isKorepetycjeManager, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
    yield express_validator_1.check('name', 'Name cannot be blank').isLength({ min: 1 }).run(req);
    const tutor = req.body;
    delete tutor._id;
    Tutor_1.Tutor.create(tutor)
        .then((doc) => res.json(doc))
        .catch(next);
}));
exports.tutors.get('/:id', (req, res, next) => {
    Tutor_1.Tutor.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});
exports.tutors.put('/:id', guards_1.isKorepetycjeManager, (req, res, next) => {
    const tutor = req.body;
    delete tutor._id;
    Tutor_1.Tutor.findByIdAndUpdate(req.params.id, tutor)
        .then(() => res.json(tutor))
        .catch(next);
});
exports.tutors.delete('/:id', (req, res, next) => {
    Tutor_1.Tutor.findByIdAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});
//# sourceMappingURL=tutors.js.map