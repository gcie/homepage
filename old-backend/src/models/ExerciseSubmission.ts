import { Document, model, Schema } from 'mongoose';

export type ExerciseSubmissionDocument = Document & {
    exerciseId: string;
    userId: string;
    output: string;
    statusCode: number;
    memory: number;
    cpuTime: number;
    program: string;
    success: boolean;
    score: number;
};

const exerciseSubmissionSchema = new Schema(
    {
        exerciseId: String,
        userId: String,
        output: String,
        statusCode: Number,
        memory: Number,
        cpuTime: Number,
        program: String,
        success: Boolean,
        score: Number,
    },
    { timestamps: true }
);

export const ExerciseSubmission = model<ExerciseSubmissionDocument>('ExerciseSubmission', exerciseSubmissionSchema);
