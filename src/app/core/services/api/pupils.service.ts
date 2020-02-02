import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pupil } from 'src/app/shared/models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PupilsService {
    private pupilsUrl = '/api/pupils';

    constructor(private http: HttpClient) {}

    /**
     * Get list of all pupils.
     */
    getPupils(): Observable<Pupil[]> {
        return this.http.get<Pupil[]>(this.pupilsUrl);
    }

    /**
     * Create new pupil.
     * @param pupil pupil data
     */
    createPupil(pupil: Pupil): Observable<Pupil> {
        return this.http.post<Pupil>(this.pupilsUrl, pupil);
    }

    /**
     * Get pupil by id.
     * @param pupilId pupil id
     */
    getPupilById(pupilId: string): Observable<Pupil> {
        return this.http.get<Pupil>(this.pupilsUrl + '/' + pupilId);
    }

    /**
     * Delete pupil by id.
     * @param pupilId pupil id
     */
    deletePupil(pupilId: string): Observable<string> {
        return this.http.delete<string>(this.pupilsUrl + '/' + pupilId);
    }

    /**
     * Update pupil data.
     * @param pupil pupil data
     */
    updatePupil(pupil: Pupil): Observable<Pupil> {
        const putUrl = this.pupilsUrl + '/' + pupil._id;
        return this.http.put<Pupil>(putUrl, pupil);
    }
}
