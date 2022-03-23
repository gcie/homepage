import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestcaseResult } from './testcase-result.enum';

export class TestcaseResultDto {
    @ApiProperty()
    program: string;

    @ApiPropertyOptional()
    stdout?: string;

    @ApiPropertyOptional()
    stderr?: string;

    // @Prop({ type: TestcaseResult })
    @ApiPropertyOptional({ enum: TestcaseResult })
    result?: TestcaseResult;
}

export const TestcaseResultDtoType = {
    program: { type: String },
    stdout: { type: String },
    stderr: { type: String },
    result: { type: String, enum: TestcaseResult },
};
