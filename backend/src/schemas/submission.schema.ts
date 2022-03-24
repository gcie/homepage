import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { SubmissionStatus } from 'src/model/submission-status.enum';
import { Exercise } from './exercise.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Submission extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) user: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }) exercise: Exercise;
    @Prop() program: string;
    @Prop({ type: String, enum: SubmissionStatus }) status: SubmissionStatus;
    @Prop() atTestcase?: number;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
