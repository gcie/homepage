import { Document, model, Schema, Types } from 'mongoose';

export type PupilDocument = Document & {
    name: string;
    email: string;
    phone?: string;
    class: string;
    needs: string;
    mainNeeds?: string;
    notes?: string;
    isMature?: boolean;
    remoteOrStationary: number;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
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
        mainNeeds: String,
        notes: String,
        isMature: Boolean,
        remoteOrStationary: Number,
        parentName: String,
        parentEmail: String,
        parentPhone: String,
        lessonsStatus: String,
        assignedTutorId: Types.ObjectId,
        assignedTutorName: String,
    },
    { timestamps: true }
);

export const Pupil = model<PupilDocument>('Pupil', pupilSchema);
