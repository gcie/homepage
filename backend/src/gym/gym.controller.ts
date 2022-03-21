import { Body, Controller, HttpException, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AddExerciseInDto, ExerciseOutDto } from 'src/model/add-exercise-in.dto';
import { AddExerciseOutDto } from 'src/model/add-exercise-out.dto';
import { Roles } from 'src/model/role.decorator';
import { Role } from 'src/model/role.enum';
import { RunProgramInDto } from 'src/model/run-program-in.dto';
import { RunProgramOutDto } from 'src/model/run-program-out.dto';
import { RunTestcasesOutDto } from 'src/model/run-testcases.model';
import { SubmissionInDto } from 'src/model/submission.model';
import { ExercisesService } from './services/exercises.service';
import { PythonService } from './services/python.service';

@Controller('api/gym')
export class GymController {
    constructor(private pythonService: PythonService, private exercises: ExercisesService) {}

    @Post('run')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'run' })
    @ApiOkResponse({ type: RunProgramOutDto })
    @ApiForbiddenResponse()
    async run(@Body() body: RunProgramInDto): Promise<RunProgramOutDto> {
        return new RunProgramOutDto(await this.pythonService.run(body.program));
    }

    @Post('exercises/add')
    @Roles(Role.Admin)
    @ApiOperation({ operationId: 'addExercise' })
    @ApiCreatedResponse({ description: 'Exercise created successfully.', type: AddExerciseOutDto })
    @ApiForbiddenResponse()
    async addExercise(@Body() exerciseDto: AddExerciseInDto) {
        return this.exercises.add(exerciseDto);
    }

    @Post('exercises/get')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'getExercises' })
    @ApiOkResponse({ type: [ExerciseOutDto] })
    @ApiForbiddenResponse()
    async getExercises(): Promise<ExerciseOutDto[]> {
        return this.exercises.findAll();
    }

    @Post('exercises/:id/get')
    @Roles(Role.User)
    async getExercise(@Param('id') exerciseId) {
        return this.exercises.find(exerciseId);
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
