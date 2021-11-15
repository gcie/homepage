"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutor = void 0;
const mongoose_1 = require("mongoose");
const tutorSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    phone: String,
    teaches: String,
    notes: String,
    lessonsStatus: String,
    assignedPupilId: mongoose_1.Types.ObjectId,
    assignedPupilName: String,
}, { timestamps: true });
exports.Tutor = mongoose_1.model('Tutor', tutorSchema);
//# sourceMappingURL=Tutor.js.map