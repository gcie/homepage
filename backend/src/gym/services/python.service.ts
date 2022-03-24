import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { spawn } from 'child_process';
import { Model } from 'mongoose';
import { RunTestcaseOutDto } from 'src/model/run-testcase-out.dto';
import { SubmissionStatus } from 'src/model/submission-status.enum';
import { TestcaseResult } from 'src/model/testcase-result.enum';
import { Testcase } from 'src/model/testcase.model';
import { Results } from 'src/schemas/results.schema';
import { Submission } from 'src/schemas/submission.schema';
import { RunResult } from '../../model/run-result.model';

@Injectable()
export class PythonService {
    constructor(@InjectModel(Submission.name) private submissionModel: Model<Submission>) {}

    async run(program: string, input?: string, timeout: number = 500) {
        var result: RunResult = { stdout: '', stderr: '' };
        await new Promise((resolve) => {
            const prog = spawn('python', ['-c', program], { timeout });
            prog.stdout.on('data', (data) => (result.stdout += data.toString()));
            prog.stderr.on('data', (data) => (result.stderr += data.toString()));
            prog.on('error', (err) => (result.error = err));
            prog.on('close', (code, signal) => {
                result.signal = signal;
                result.code = code;
                resolve(undefined);
            });
            if (input) {
                prog.stdin.write(input);
                prog.stdin.end();
            }
            if (timeout) setTimeout(() => prog.kill('SIGTERM'), timeout);
        });
        result.stdout = result.stdout?.trim();
        result.stderr = result.stderr?.trim();
        return result;
    }

    async runTestcase(program: string, testcase: Testcase): Promise<RunTestcaseOutDto> {
        const result = await this.run(program, testcase.input, testcase.timeLimit);
        if (result.code || (result.signal && result.signal !== 'SIGTERM'))
            return {
                stdout: result.stdout,
                stderr: result.stderr,
                result: TestcaseResult.ERROR,
            };
        if (result.signal === 'SIGTERM')
            return {
                stdout: result.stdout,
                stderr: result.stderr,
                result: TestcaseResult.TIMEOUT,
            };
        return {
            stdout: result.stdout,
            stderr: result.stderr,
            result: result.stdout?.trim() === testcase.output?.trim() ? TestcaseResult.OK : TestcaseResult.WRONG_ANSWER,
        };
    }

    async runTestcases(program: string, testcases: Testcase[]): Promise<RunTestcaseOutDto[]> {
        const results = [];
        for (let testcase of testcases) {
            results.push(await this.runTestcase(program, testcase));
        }
        return results;
    }

    async submit(program: string, testcases: Testcase[], submission: Submission, results: Results) {
        let i = 0;
        results.lastProgram = program;
        for (let testcase of testcases) {
            i += 1;
            submission.status = SubmissionStatus.RUNNING;
            submission.atTestcase = i;
            await submission.save();
            const result = await this.runTestcase(program, testcase);
            if (result.result != TestcaseResult.OK) {
                submission.status = SubmissionStatus[result.result.toString()];
                await submission.save();
                results.score = i - 1;
                results.save();
                return;
            }
        }
        submission.status = SubmissionStatus.OK;
        submission.save();
        results.score = i;
        results.save();
    }
}
