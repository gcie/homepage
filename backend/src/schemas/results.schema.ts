import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { TestcaseResultDto, TestcaseResultDtoType } from 'src/model/testcase-result.dto';
import { Exercise } from './exercise.schema';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Results extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) user: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }) exercise: Exercise;

    @Prop({ type: [TestcaseResultDtoType] }) testcaseResults: TestcaseResultDto[];

    @Prop() lastProgram: string;
}

export const ResultsSchema = SchemaFactory.createForClass(Results);
