import { ApiPropertyOptional } from '@nestjs/swagger';
import { TestcaseResult } from './testcase-result.enum';

export class RunTestcaseOutDto {
    constructor(object: Partial<RunTestcaseOutDto>) {
        this.stdout = object.stdout;
        this.stderr = object.stderr;
        this.result = object.result;
    }

    @ApiPropertyOptional()
    stdout?: string;

    @ApiPropertyOptional()
    stderr?: string;

    @ApiPropertyOptional({ enum: TestcaseResult })
    result?: TestcaseResult;
}
