import { ApiProperty } from '@nestjs/swagger';

export class SubmitExerciseDto {
    constructor(object: Partial<SubmitExerciseDto>) {
        this.score = object.score;
        this.maxScore = object.maxScore;
    }

    @ApiProperty()
    score: number;

    @ApiProperty()
    maxScore: number;
}
