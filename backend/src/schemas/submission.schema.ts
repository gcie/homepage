import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Exercise } from './exercise.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Submission extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) user: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }) exercise: Exercise;
    @Prop() program: string;
    @Prop() result: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
