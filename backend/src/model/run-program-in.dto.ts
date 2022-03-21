import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RunProgramInDto {
    @ApiProperty()
    @IsNotEmpty()
    program: string;
}
