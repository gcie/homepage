import { ApiProperty } from '@nestjs/swagger';
import { ExerciseDescDto } from './exercise-desc.dto';

export class GetExercisesOutDto {
    @ApiProperty({ type: [ExerciseDescDto] })
    exercises: ExerciseDescDto[];
}
