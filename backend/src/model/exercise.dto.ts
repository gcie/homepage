import { IsNotEmpty } from 'class-validator';
import { TestcaseDto } from './testcase.dto';

export class ExerciseDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() description: string;

    @IsNotEmpty() inputDesc: string;
    @IsNotEmpty() outputDesc: string;

    prefix?: string;
    suffix?: string;

    testcases: TestcaseDto[];
    hiddenTestcases: TestcaseDto[];
}
