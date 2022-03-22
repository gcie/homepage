/* tslint:disable */
/* eslint-disable */
import { TestcaseDto } from './testcase-dto';
export interface ExerciseDto {
    description: string;
    inputDesc: string;
    name: string;
    outputDesc: string;
    prefix?: string;
    suffix?: string;
    testcases: Array<TestcaseDto>;
}
