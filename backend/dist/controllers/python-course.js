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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pythonCourse = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const passport_1 = require("../config/passport");
const validate_1 = require("../exercises/validate");
const Exercise_1 = require("../models/Exercise");
const ExerciseSubmission_1 = require("../models/ExerciseSubmission");
const logger_1 = __importDefault(require("../util/logger"));
exports.pythonCourse = express_1.Router();
exports.pythonCourse.get('/exercise/:id', passport_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.debug(req.params.id);
    const user = req.user;
    const exercise = yield Exercise_1.Exercise.findOne({ id: req.params.id });
    const solution = yield ExerciseSubmission_1.ExerciseSubmission.find({ exerciseId: req.params.id, userId: user._id, score: { $gt: 0 } }).sort({
        score: -1,
        createdAt: -1,
    });
    const score = solution.length > 0 ? solution[0].score : 0;
    const done = score === exercise.maxPoints;
    const bestProgram = solution.length > 0 ? solution[0].program : undefined;
    res.status(200).json(Object.assign(exercise.toJSON(), {
        score,
        done,
        solution: bestProgram,
    }));
}));
exports.pythonCourse.post('/exercise/:id/submit', passport_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('program', 'Program nie może być pusty').notEmpty().run(req);
    logger_1.default.debug(`Submitted exercise: ${req.params.id}`);
    const exercise = yield Exercise_1.Exercise.findOne({ id: req.params.id });
    const result = yield validate_1.validate(req.params.id, req.body.program);
    const doc = result;
    doc.exerciseId = req.params.id;
    doc.program = req.body.program;
    doc.userId = req.user._id;
    doc.done = result.score === exercise.maxPoints;
    delete doc._id;
    res.status(200).json(result);
    ExerciseSubmission_1.ExerciseSubmission.create(doc);
}));
//# sourceMappingURL=python-course.js.map