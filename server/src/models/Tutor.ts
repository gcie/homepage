import { Document, model, Schema, Types } from 'mongoose';

export type TutorDocument = Document & {
    name: string;
    email: string;
    phone: string;
    teaches: {
        [subject: string]: {
            sp: boolean;
            lo: boolean;
            matura: boolean;
        };
    };
    notes: string;
    remoteOrStationary: number;
    lessonsStatus: string;
    assignedPupilId?: Types.ObjectId;
    assignedPupilName?: string;
};

const tutorSchema = new Schema(
    {
        name: String,
        email: String,
        phone: String,
        teaches: Object,
        notes: String,
        remoteOrStationary: Number,
        lessonsStatus: String,
        assignedPupilId: Types.ObjectId,
        assignedPupilName: String,
    },
    { timestamps: true }
);

export const Tutor = model<TutorDocument>('Tutor', tutorSchema);
