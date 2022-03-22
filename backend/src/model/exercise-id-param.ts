import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class ExerciseIdParam {
    @ApiProperty({ description: 'Exercise id' })
    @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Invalid exercise id' })
    exerciseId: string;
}
