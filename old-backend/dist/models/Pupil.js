"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pupil = void 0;
const mongoose_1 = require("mongoose");
const pupilSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    phone: String,
    class: String,
    needs: String,
    notes: String,
    parentName: String,
    parentEmail: String,
    parentPhone: String,
    lessonsStatus: String,
    assignedTutorId: mongoose_1.Types.ObjectId,
    assignedTutorName: String,
}, { timestamps: true });
exports.Pupil = mongoose_1.model('Pupil', pupilSchema);
//# sourceMappingURL=Pupil.js.map