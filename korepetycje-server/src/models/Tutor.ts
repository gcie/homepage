import { Document, Types, Schema, model } from 'mongoose';

export type TutorDocument = Document & {
    name: string;
    email: string;
    phone: string;
    teaches: string;
    notes: string;
    assignedPupilId: Types.ObjectId;
};

const tutorSchema = new Schema(
    {
        name: String,
        email: String,
        phone: String,
        teaches: String,
        notes: String,
        assignedPupilId: Types.ObjectId
    },
    { timestamps: true }
);

export const Tutor = model<TutorDocument>('Tutor', tutorSchema);
