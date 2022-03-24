import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

    @ApiPropertyOptional()
    prefix?: string;

    @ApiPropertyOptional()
    suffix?: string;

    @ApiPropertyOptional()
    initialCode?: string;

    @ApiProperty({ type: [TestcaseDto] })
    @IsNotEmpty()
    testcases: TestcaseDto[];

    @ApiProperty({ type: [TestcaseDto] })
    @IsNotEmpty()
    hiddenTestcases: TestcaseDto[];
}
