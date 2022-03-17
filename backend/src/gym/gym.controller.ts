import { Body, Controller, HttpException, Param, Post } from '@nestjs/common';
import { ExerciseDto } from 'src/model/exercise.dto';
import { Roles } from 'src/model/role.decorator';
import { Role } from 'src/model/role.enum';
import { RunTestcasesOutDto } from 'src/model/run-testcases.model';
import { SubmissionInDto } from 'src/model/submission.model';
import { ExercisesService } from './services/exercises.service';
import { PythonService } from './services/python.service';

@Controller('api/gym')
export class GymController {
    constructor(private pythonService: PythonService, private exercises: ExercisesService) {}

    @Post('run')
    @Roles(Role.User)
    async run(@Body() body) {
        return this.pythonService.run(body.program);
    }

    @Post('exercises/add')
    @Roles(Role.Admin)
    async addExercise(@Body() exerciseDto: ExerciseDto) {
        return this.exercises.add(exerciseDto);
    }

    @Post('exercises/:id/submit')
    @Roles(Role.User)
    async submit(@Body() submission, @Param('id') exerciseId) {
        const exercise = await this.exercises.find(exerciseId);
        if (!exercise) throw new HttpException('Exercise not found', 404);
        const runResult = await this.pythonService.run(submission);
        console.log(runResult);
    }

    @Post('exercises/:id/runTestcases')
    @Roles(Role.User)
    async runTestcases(@Body() submission: SubmissionInDto, @Param('id') exerciseId) {
        const exercise = await this.exercises.find(exerciseId);
        if (!exercise) throw new HttpException('Exercise not found', 404);
        const results: RunTestcasesOutDto = await Promise.all(
            exercise.testcases.map((testcase) => this.pythonService.runTestcase(submission.code, testcase)),
        );
        return results;
    }
}
