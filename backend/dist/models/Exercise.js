"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    maxPoints: Number,
    content: String,
    title: String,
    description: String,
});
exports.Exercise = mongoose_1.model('Exercise', exerciseSchema);
//# sourceMappingURL=Exercise.js.map