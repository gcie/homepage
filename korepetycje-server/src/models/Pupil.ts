import { Document, Types, Schema, model } from 'mongoose';

export type PupilDocument = Document & {
    name: string;
    email: string;
    phone: string;
    class: string;
    needs: string;
    notes: string;
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    lessonsStatus: string;
    assignedTutorId?: Types.ObjectId;
    assignedTutorName?: string;
};

const pupilSchema = new Schema(
    {
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
        assignedTutorId: Types.ObjectId,
        assignedTutorName: String
    },
    { timestamps: true }
);

export const Pupil = model<PupilDocument>('Pupil', pupilSchema);
