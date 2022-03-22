import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestcaseDto } from './testcase.dto';

export class ExerciseDto {
    constructor(object: Partial<ExerciseDto>) {
        this.name = object.name;
        this.description = object.description;
        this.inputDesc = object.inputDesc;
        this.outputDesc = object.outputDesc;
        this.prefix = object.prefix;
        this.suffix = object.suffix;
        this.testcases = object.testcases;
    }

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    inputDesc: string;

    @ApiProperty()
    outputDesc: string;

    @ApiPropertyOptional()
    prefix?: string;

    @ApiPropertyOptional()
    suffix?: string;

    @ApiProperty({ type: [TestcaseDto] })
    testcases: TestcaseDto[];
}
