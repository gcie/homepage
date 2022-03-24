import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Testcase, TestcasesType } from '../model/testcase.model';

@Schema()
export class Exercise extends Document {
    @Prop({ unique: true }) name: string;
    @Prop() description: string;
    @Prop() inputDesc: string;
    @Prop() outputDesc: string;
    @Prop() prefix: string;
    @Prop() suffix: string;
    @Prop() initialCode: string;

    @Prop(TestcasesType) testcases: Testcase[];
    @Prop(TestcasesType) hiddenTestcases: Testcase[];
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
