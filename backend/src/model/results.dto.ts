import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestcaseResultDto } from './testcase-result.dto';

export class ResultsDto {
    constructor(object: Partial<ResultsDto>) {
        this.testcaseResults = object.testcaseResults;
    }

    @ApiProperty({ type: [TestcaseResultDto] })
    testcaseResults: TestcaseResultDto[];

    @ApiPropertyOptional({ type: String })
    lastProgram?: string;
}
