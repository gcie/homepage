import { ApiPropertyOptional } from '@nestjs/swagger';
import { TestcaseResult } from './testcase-result.enum';
import { TestcaseDto } from './testcase.dto';

export class TestcaseWithResultDto extends TestcaseDto {
    @ApiPropertyOptional()
    program?: string;

    @ApiPropertyOptional()
    stdout?: string;

    @ApiPropertyOptional()
    stderr?: string;

    // @Prop({ type: TestcaseResult })
    @ApiPropertyOptional({ enum: TestcaseResult })
    result?: TestcaseResult;
}
