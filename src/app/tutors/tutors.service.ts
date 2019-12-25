import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutor } from './tutor';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TutorsService {
    private tutorsUrl = '/api/tutors';

    constructor(private http: HttpClient) {}

    // get("/api/tutors")
    getTutors(): Observable<Tutor[]> {
        return this.http.get<Tutor[]>(this.tutorsUrl);
    }

    // post("/api/tutors")
    createTutor(newTutor: Tutor): Observable<Tutor> {
        return this.http.post<Tutor>(this.tutorsUrl, newTutor);
    }

    // get("/api/tutors/:id") endpoint not used by Angular app

    // delete("/api/tutors/:id")
    deleteTutor(delTutorId: string): Observable<string> {
        return this.http.delete<string>(this.tutorsUrl + '/' + delTutorId);
    }

    // put("/api/tutors/:id")
    updateTutor(putTutor: Tutor): Observable<Tutor> {
        const putUrl = this.tutorsUrl + '/' + putTutor._id;
        return this.http.put<Tutor>(putUrl, putTutor);
    }
}
