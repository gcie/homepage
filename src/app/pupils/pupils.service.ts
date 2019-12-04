import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pupil } from './pupil';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PupilsService {
    private pupilsUrl = '/api/pupils';

    constructor(private http: HttpClient) {}

    // get("/api/pupils")
    getPupils(): Observable<Pupil[]> {
        return this.http.get<Pupil[]>(this.pupilsUrl);
    }

    // post("/api/pupils")
    createPupil(newPupil: Pupil): Observable<Pupil> {
        return this.http.post<Pupil>(this.pupilsUrl, newPupil);
    }

    // get("/api/pupils/:id") endpoint not used by Angular app

    // delete("/api/pupils/:id")
    deletePupil(delPupilId: string): Observable<string> {
        return this.http.delete<string>(this.pupilsUrl + '/' + delPupilId);
    }

    // put("/api/pupils/:id")
    updatePupil(putPupil: Pupil): Observable<Pupil> {
        const putUrl = this.pupilsUrl + '/' + putPupil._id;
        return this.http.put<Pupil>(putUrl, putPupil);
    }
}
