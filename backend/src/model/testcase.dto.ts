import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TestcaseDto {
    @ApiProperty()
    @IsNotEmpty()
    input: string;

    @ApiPropertyOptional()
    output?: string;

    @ApiPropertyOptional()
    checker?: string;
}
