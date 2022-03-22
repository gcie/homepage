import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SubmissionInDto {
    @ApiProperty()
    @IsNotEmpty()
    code: string;
}
