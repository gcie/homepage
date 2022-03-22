import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { RunTestcaseOutDto } from 'src/model/run-testcase-out.dto';
import { TestcaseResult } from 'src/model/testcase-result.enum';
import { Testcase } from 'src/model/testcase.model';
import { RunResult } from '../../model/run-result.model';

@Injectable()
export class PythonService {
    async run(program: string, input?: string, timeout: number = 100) {
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
        return await Promise.all(testcases.map((testcase) => this.runTestcase(program, testcase)));
    }
}
