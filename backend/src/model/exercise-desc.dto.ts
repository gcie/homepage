import { ApiProperty } from '@nestjs/swagger';

export class ExerciseDescDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    score: number;

    @ApiProperty()
    maxScore: number;
}
