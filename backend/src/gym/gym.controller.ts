import { BadRequestException, Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { AddExerciseInDto } from 'src/model/add-exercise-in.dto';
import { AddExerciseOutDto } from 'src/model/add-exercise-out.dto';
import { ExerciseIdParam } from 'src/model/exercise-id-param';
import { ExerciseDto } from 'src/model/exercise.dto';
import { GetExercisesOutDto } from 'src/model/get-exercises-out.dto';
import { Roles } from 'src/model/role.decorator';
import { Role } from 'src/model/role.enum';
import { RunProgramInDto } from 'src/model/run-program-in.dto';
import { RunProgramOutDto } from 'src/model/run-program-out.dto';
import { RunTestcaseOutDto } from 'src/model/run-testcase-out.dto';
import { SubmissionInDto } from 'src/model/submission-in.dto';
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

    @Get('exercises/get')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'getExercises' })
    @ApiOkResponse({ type: GetExercisesOutDto })
    @ApiForbiddenResponse()
    async getExercises(@Req() request): Promise<GetExercisesOutDto> {
        return this.exercises.mapExercisesToGetExercisesOutDto(await this.exercises.findAll(request.user._id));
    }

    @Get('exercises/:exerciseId/get')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'getExercise' })
    @ApiOkResponse({ type: ExerciseDto })
    @ApiForbiddenResponse()
    async getExercise(@Param() { exerciseId }: ExerciseIdParam) {
        const exercise = await this.exercises.find(exerciseId);
        return new ExerciseDto(exercise);
    }

    @Post('exercises/:exerciseId/testcase/:testcaseId/run')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'runTestcase' })
    @ApiOkResponse({ type: RunTestcaseOutDto, description: 'Code ran successfully.' })
    @ApiBadRequestResponse()
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    async runTestcase(
        @Body() submission: SubmissionInDto,
        @Param() { exerciseId }: ExerciseIdParam,
        @Param('testcaseId', ParseIntPipe) testcaseId: number,
    ): Promise<RunTestcaseOutDto> {
        const exercise = await this.exercises.find(exerciseId);
        if (!exercise) throw new NotFoundException('Exercise not found');
        if (exercise.testcases.length < testcaseId)
            throw new BadRequestException(`Testcase id must be between 1 and ${exercise.testcases.length}`);
        return await this.pythonService.runTestcase(submission.code, exercise.testcases[testcaseId - 1]);
    }

    @Post('exercises/:exerciseId/run')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'runTestcases' })
    @ApiOkResponse({ type: [RunTestcaseOutDto] })
    @ApiBadRequestResponse()
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    async runTestcases(@Body() submission: SubmissionInDto, @Param() { exerciseId: id }: ExerciseIdParam) {
        const exercise = await this.exercises.find(id);
        if (!exercise) throw new NotFoundException('Exercise not found');
        return await this.pythonService.runTestcases(submission.code, exercise.testcases);
    }

    @Post('exercises/:exerciseId/submit')
    @Roles(Role.User)
    async submit(@Body() submission: SubmissionInDto, @Param() { exerciseId: id }: ExerciseIdParam) {
        const exercise = await this.exercises.find(id);
        if (!exercise) throw new NotFoundException('Exercise not found');
        // const runResult = await this.pythonService.run(submission.code, exercise);
        // console.log(runResult);
    }
}
