import { Schema } from 'mongoose';

export interface Submission {
    exerciseId: Schema.Types.ObjectId;
    code: string;
    result?: string;
}

export const SubmissionType = {
    exerciseId: { type: Schema.Types.ObjectId },
    code: { type: String },
    result: { type: String },
};
