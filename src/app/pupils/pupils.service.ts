import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pupil } from './pupil';

@Injectable({
    providedIn: 'root'
})
export class PupilsService {
    private pupilsUrl = '/api/pupils';

    constructor(private http: HttpClient) {}

    // get("/api/pupils")
    getPupils(): Promise<void | Pupil[]> {
        return this.http
            .get(this.pupilsUrl)
            .toPromise()
            .then((response) => response as Pupil[])
            .catch(this.handleError);
    }

    // post("/api/pupils")
    createPupil(newPupil: Pupil): Promise<void | Pupil> {
        return this.http
            .post(this.pupilsUrl, newPupil)
            .toPromise()
            .then((response) => response as Pupil)
            .catch(this.handleError);
    }

    // get("/api/pupils/:id") endpoint not used by Angular app

    // delete("/api/pupils/:id")
    deletePupil(delPupilId: string): Promise<void | string> {
        return this.http
            .delete(this.pupilsUrl + '/' + delPupilId)
            .toPromise()
            .then((response) => response as string)
            .catch(this.handleError);
    }

    // put("/api/pupils/:id")
    updatePupil(putPupil: Pupil): Promise<void | Pupil> {
        const putUrl = this.pupilsUrl + '/' + putPupil._id;
        return this.http
            .put(putUrl, putPupil)
            .toPromise()
            .then((response) => response as Pupil)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}
