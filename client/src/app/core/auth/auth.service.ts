import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { UserLoginData, UserRegisterData, User } from './models/user';
import { AuthResult } from './models/auth-result';
import { PermissionGroup } from './models/permission-group.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    public login(credentials: UserLoginData) {
        return this.http.post<AuthResult>('/login', credentials).pipe(map(this.setSession));
    }

    public register(credentails: UserRegisterData) {
        return this.http.post<AuthResult>('/api/users', credentails);
    }

    private setSession(authResult: AuthResult) {
        console.log(authResult);
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('user', JSON.stringify(authResult.user));
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

    public isAdmin(): boolean {
        return this.getGroup() === PermissionGroup.admin;
    }

    public isManager(): boolean {
        const group = this.getGroup();
        return group === PermissionGroup.admin || group === PermissionGroup.manager;
    }

    public getUser(): User | null {
        return JSON.parse(localStorage.getItem('user') || 'null');
    }

    public getName() {
        return this.getUser()?.name;
    }

    public getGroup() {
        return this.getUser()?.group;
    }

    public getEmail() {
        return this.getUser()?.email;
    }
}
