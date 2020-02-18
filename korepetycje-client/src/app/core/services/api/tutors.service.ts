import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from 'src/app/shared/models';

@Injectable({
    providedIn: 'root'
})
export class TutorsService {
    private tutorsUrl = '/api/tutors';

    constructor(private http: HttpClient) {}

    /**
     * Get list of all tutors.
     */
    getTutors(): Observable<Tutor[]> {
        return this.http.get<Tutor[]>(this.tutorsUrl);
    }

    /**
     * Create new tutor.
     * @param tutor tutor data
     */
    createTutor(tutor: Tutor): Observable<Tutor> {
        return this.http.post<Tutor>(this.tutorsUrl, tutor);
    }

    /**
     * Get tutor by id.
     * @param tutorId tutor id
     */
    getTutorById(tutorId?: string): Observable<Tutor> {
        return this.http.get<Tutor>(this.tutorsUrl + '/' + tutorId);
    }

    /**
     * Delete tutor by id.
     * @param tutorId tutor id
     */
    deleteTutor(tutorId?: string): Observable<string> {
        return this.http.delete<string>(this.tutorsUrl + '/' + tutorId);
    }

    /**
     * Update tutor data.
     * @param tutor tutor data
     */
    updateTutor(tutor: Tutor): Observable<Tutor> {
        const putUrl = this.tutorsUrl + '/' + tutor._id;
        return this.http.put<Tutor>(putUrl, tutor);
    }
}
