import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestcaseWithResultDto } from './testcase-with-results.dto';

export class ExerciseDto {
    constructor(object: Partial<ExerciseDto>) {
        this._id = object._id;
        this.name = object.name;
        this.description = object.description;
        this.inputDesc = object.inputDesc;
        this.outputDesc = object.outputDesc;
        this.prefix = object.prefix;
        this.suffix = object.suffix;
        this.testcases = object.testcases;
        this.lastProgram = object.lastProgram;
        this.maxScore = object.maxScore;
        this.score = object.score;
    }

    @ApiProperty()
    _id: string;

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

    @ApiProperty({ type: [TestcaseWithResultDto] })
    testcases: TestcaseWithResultDto[];

    @ApiPropertyOptional()
    lastProgram?: string;

    @ApiProperty()
    maxScore: number;

    @ApiProperty()
    score: number;
}
