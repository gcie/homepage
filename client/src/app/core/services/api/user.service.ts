import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userUrl = '/api/user';

    constructor(private http: HttpClient) {}

    getGravatarURI(): Observable<string> {
        return this.http.get<string>(this.userUrl + '/gravatarURI');
    }

    getGravatar(): Observable<any> {
        return this.http.get<any>(this.userUrl + '/gravatar');
    }
}
