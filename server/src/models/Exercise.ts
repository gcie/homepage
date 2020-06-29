import { Document, model, Schema } from 'mongoose';

export type ExerciseDocument = Document & {
    id: string;
    content: string;
    maxPoints: number;
    name: string;
};

const exerciseSchema = new Schema({
    id: String,
    name: String,
    maxPoints: Number,
    content: String,
});

export const Exercise = model<ExerciseDocument>('Exercise', exerciseSchema);
