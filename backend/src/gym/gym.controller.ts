import { BadRequestException, Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Req, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { AddExerciseInDto } from 'src/model/add-exercise-in.dto';
import { AddExerciseOutDto } from 'src/model/add-exercise-out.dto';
import { ExerciseIdParam } from 'src/model/exercise-id-param';
import { ExerciseDto } from 'src/model/exercise.dto';
import { GetExercisesOutDto } from 'src/model/get-exercises-out.dto';
import { ResultsDto } from 'src/model/results.dto';
import { Roles } from 'src/model/role.decorator';
import { Role } from 'src/model/role.enum';
import { RunProgramInDto } from 'src/model/run-program-in.dto';
import { RunProgramOutDto } from 'src/model/run-program-out.dto';
import { RunTestcaseOutDto } from 'src/model/run-testcase-out.dto';
import { SubmissionIdParam } from 'src/model/submission-id-param';
import { SubmissionInDto } from 'src/model/submission-in.dto';
import { SubmissionStatus } from 'src/model/submission-status.enum';
import { SubmissionDto } from 'src/model/submission.dto';
import { Submission } from 'src/schemas/submission.schema';
import { ExercisesService } from './services/exercises.service';
import { PythonService } from './services/python.service';
@Controller('api/gym')
export class GymController {
    constructor(
        private pythonService: PythonService,
        private exercises: ExercisesService,
        @InjectModel(Submission.name) private submissionModel: Model<Submission>,
    ) {}

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
        const [exercises, results] = await Promise.all([
            this.exercises.findAll(request.user._id),
            this.exercises.getResults(request.user._id),
        ]);
        return this.exercises.getExercisesOutDto(exercises, results);
    }

    @Get('exercises/:exerciseId/get')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'getExercise' })
    @ApiOkResponse({ type: ExerciseDto })
    @ApiForbiddenResponse()
    async getExercise(@Req() request, @Param() { exerciseId }: ExerciseIdParam) {
        const exercise = await this.exercises.find(exerciseId);
        const results = await this.exercises.getResults(request.user._id, exercise);
        return this.exercises.getExerciseWithResultsDto(exercise, results);
    }

    @Post('exercises/:exerciseId/testcase/:testcaseId/run')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'runTestcase' })
    @ApiOkResponse({ type: RunTestcaseOutDto, description: 'Code ran successfully.' })
    @ApiBadRequestResponse()
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    async runTestcase(
        @Request() request,
        @Body() submission: SubmissionInDto,
        @Param() { exerciseId }: ExerciseIdParam,
        @Param('testcaseId', ParseIntPipe) testcaseId: number,
    ): Promise<RunTestcaseOutDto> {
        const exercise = await this.exercises.find(exerciseId);

        if (!exercise) throw new NotFoundException('Exercise not found');
        if (exercise.testcases.length < testcaseId)
            throw new BadRequestException(`Testcase id must be between 1 and ${exercise.testcases.length}`);

        const testcaseResult = await this.pythonService.runTestcase(submission.code, exercise.testcases[testcaseId - 1]);
        const results = await this.exercises.getResults(request.user._id, exercise);
        results.testcaseResults[testcaseId - 1] = { ...testcaseResult, program: submission.code };
        results.lastProgram = submission.code;
        results.save();
        return testcaseResult;
    }

    @Post('exercises/:exerciseId/run')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'runTestcases' })
    @ApiOkResponse({ type: [RunTestcaseOutDto] })
    @ApiBadRequestResponse()
    @ApiNotFoundResponse()
    @ApiForbiddenResponse()
    async runTestcases(@Request() request, @Body() submission: SubmissionInDto, @Param() { exerciseId }: ExerciseIdParam) {
        const exercise = await this.exercises.find(exerciseId);
        if (!exercise) throw new NotFoundException('Exercise not found');
        const results = await this.exercises.getResults(request.user._id, exercise);
        const testcaseResults = await this.pythonService.runTestcases(submission.code, exercise.testcases);
        results.testcaseResults = testcaseResults.map((r) => ({ ...r, program: submission.code }));
        results.lastProgram = submission.code;
        results.save();
        return testcaseResults;
    }

    @Get('exercises/:exerciseId/results')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'getExerciseResults' })
    @ApiOkResponse({ type: [ResultsDto] })
    @ApiForbiddenResponse()
    async getExerciseResults(@Request() request): Promise<ResultsDto[]> {
        return await this.exercises.getResults(request.user._id);
    }

    @Post('exercises/:exerciseId/submit')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'submitExercise' })
    @ApiOkResponse({ type: String })
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    async submit(@Req() request, @Body() body: SubmissionInDto, @Param() { exerciseId }: ExerciseIdParam) {
        const exercise = await this.exercises.find(exerciseId);
        if (!exercise) throw new NotFoundException('Exercise not found');
        const results = await this.exercises.getResults(request.user._id, exercise);
        const submission = await this.submissionModel.create({
            user: request.user._id,
            exercise: exerciseId,
            program: body.code,
            status: SubmissionStatus.WAITING,
        });
        this.pythonService.submit(body.code, exercise.hiddenTestcases, submission, results);
        return submission._id;
        // const runResult = await this.pythonService.runTestcases(body.code, exercise.hiddenTestcases);
        // results.score = runResult.reduce((cnt, res) => (res.result === TestcaseResult.OK ? cnt + 1 : cnt), 0);
        // results.lastProgram = body.code;
        // results.save();
        // return new SubmitExerciseDto({ score: results.score, maxScore: exercise.hiddenTestcases.length });
    }

    @Get('submissions/:submissionId')
    @Roles(Role.User)
    @ApiOperation({ operationId: 'getSubmission' })
    @ApiOkResponse({ type: SubmissionDto })
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    async getSubmission(@Param() { submissionId }: SubmissionIdParam): Promise<SubmissionDto> {
        const submission = await this.submissionModel.findById(submissionId).exec();
        return new SubmissionDto(submission);
    }
}
