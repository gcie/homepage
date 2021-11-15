"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseSubmission = void 0;
const mongoose_1 = require("mongoose");
const exerciseSubmissionSchema = new mongoose_1.Schema({
    exerciseId: String,
    userId: String,
    output: String,
    statusCode: Number,
    memory: Number,
    cpuTime: Number,
    program: String,
    success: Boolean,
    score: Number,
}, { timestamps: true });
exports.ExerciseSubmission = mongoose_1.model('ExerciseSubmission', exerciseSubmissionSchema);
//# sourceMappingURL=ExerciseSubmission.js.map