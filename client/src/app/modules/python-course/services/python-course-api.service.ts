import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PythonCourseApiService {
    private url = '/api/python-course';

    constructor(private http: HttpClient) {}

    public getExercise(id: string) {
        return this.http.get(`${this.url}/exercise/${id}`);
    }
}
