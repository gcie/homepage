import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { RunResult } from '../../models/run-result';
import { map } from 'rxjs/operators';

interface RunResultDirty {
    runResult: {
        output: string;
        statusCode: number;
        memory: string;
        cpuTime: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class JdoodleService {
    private jdoodleUrl = '/api/jdoodle';

    private cleanRunResult: OperatorFunction<RunResultDirty, RunResult> = map((result: RunResultDirty) => ({
        output: result.runResult.output,
        statusCode: result.runResult.statusCode,
        memory: +result.runResult.memory,
        cpuTime: +result.runResult.cpuTime,
    }));

    constructor(private http: HttpClient) {}

    /**
     * Run python3 program.
     */
    runPython3(program: string): Observable<RunResult> {
        return this.http
            .post<RunResultDirty>(this.jdoodleUrl + '/python3', { program })
            .pipe(this.cleanRunResult);
    }
}
