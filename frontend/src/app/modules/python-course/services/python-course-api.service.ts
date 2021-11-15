import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/core/models/exercise';
import { RunResult } from 'src/app/core/models/run-result';

@Injectable({
    providedIn: 'root',
})
export class PythonCourseApiService {
    private url = '/api/python-course';

    constructor(private http: HttpClient) {}

    public getExercise(id: string): Observable<Exercise> {
        return this.http.get<Exercise>(`${this.url}/exercise/${id}`);
    }

    public submitExercise(id: string, program: string): Observable<RunResult> {
        return this.http.post<RunResult>(`${this.url}/exercise/${id}/submit`, { program });
    }
}
