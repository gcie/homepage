import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TestcaseDto } from './testcase.dto';

export class AddExerciseInDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    inputDesc: string;

    @ApiProperty()
    @IsNotEmpty()
    outputDesc: string;

    @ApiProperty()
    prefix?: string;

    @ApiProperty()
    suffix?: string;

    @ApiProperty({ type: [TestcaseDto] })
    testcases: TestcaseDto[];

    @ApiProperty({ type: [TestcaseDto] })
    hiddenTestcases: TestcaseDto[];
}
