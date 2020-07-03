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
    },
    { timestamps: true }
);

export const ExerciseSubmission = model<ExerciseSubmissionDocument>('ExerciseSubmission', exerciseSubmissionSchema);
