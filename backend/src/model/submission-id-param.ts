import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class SubmissionIdParam {
    @ApiProperty({ description: 'Submission id' })
    @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Invalid submission id' })
    submissionId: string;
}
