import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    public login(login: string, password: string) {
        return this.http
            .post<{ success: boolean; token: string; expiresIn: number }>('/signin', { login, password })
            .pipe(map(this.setSession));
    }

    private setSession(authResult: { success: boolean; token: string; expiresIn: number }) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    public logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        this.router.navigate(['/login']);
    }

    public isLoggedIn() {
        if (localStorage.getItem('expires_at') === null) return false;
        return moment().isBefore(this.getExpiration());
    }

    public isLoggedOut() {
        return !this.isLoggedIn();
    }

    public getExpiration() {
        const expiration = localStorage.getItem('expires_at') || '';
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
