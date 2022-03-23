/* tslint:disable */
/* eslint-disable */
import { TestcaseWithResultDto } from './testcase-with-result-dto';
export interface ExerciseDto {
    _id: string;
    description: string;
    inputDesc: string;
    lastProgram?: string;
    maxPoints: number;
    name: string;
    outputDesc: string;
    prefix?: string;
    suffix?: string;
    testcases: Array<TestcaseWithResultDto>;
}
