import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubmissionStatus } from './submission-status.enum';

export class SubmissionDto {
    constructor(object: Partial<SubmissionDto>) {
        this.program = object.program;
        this.status = object.status;
        this.atTestcase = object.atTestcase;
    }

    @ApiProperty()
    program: string;

    @ApiProperty({ enum: SubmissionStatus })
    status: SubmissionStatus;

    @ApiPropertyOptional()
    atTestcase?: number;
}
