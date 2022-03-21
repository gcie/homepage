/* tslint:disable */
/* eslint-disable */
import { TestcaseDto } from './testcase-dto';
export interface AddExerciseInDto {
  description: string;
  hiddenTestcases: Array<TestcaseDto>;
  inputDesc: string;
  name: string;
  outputDesc: string;
  prefix: string;
  suffix: string;
  testcases: Array<TestcaseDto>;
}
