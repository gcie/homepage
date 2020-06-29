import { Document } from 'mongoose';

export type ExercisesDocument = Document & {
    id: string;
    content: string;

    name: string;
};
