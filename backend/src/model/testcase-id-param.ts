import { ApiProperty } from '@nestjs/swagger';
import { ExerciseIdParam } from './exercise-id-param';

export class TestcaseIdParam extends ExerciseIdParam {
    @ApiProperty({ description: 'Testcase number (starting from 1)' })
    // @IsInt()
    testcaseId: number;
}
