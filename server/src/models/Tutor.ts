import { Document, Types, Schema, model } from 'mongoose';

export type TutorDocument = Document & {
    name: string;
    email: string;
    phone: string;
    teaches: string;
    notes: string;
    lessonsStatus: string;
    assignedPupilId?: Types.ObjectId;
    assignedPupilName?: string;
};

const tutorSchema = new Schema(
    {
        name: String,
        email: String,
        phone: String,
        teaches: String,
        notes: String,
        lessonsStatus: String,
        assignedPupilId: Types.ObjectId,
        assignedPupilName: String,
    },
    { timestamps: true }
);

export const Tutor = model<TutorDocument>('Tutor', tutorSchema);
