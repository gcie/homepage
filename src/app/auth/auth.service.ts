import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { AuthResult } from './auth-result';
import { User } from './user/user';
import { UserLoginData } from './user/user-login-data';
import { UserRegisterData } from './user/user-register-data';
import { PermissionGroup } from './user/permission-group.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    public login(credentials: UserLoginData) {
        return this.http.post<AuthResult>('/api/auth/login', credentials).pipe(map(this.setSession));
    }

    public register(credentails: UserRegisterData) {
        return this.http.post<AuthResult>('/api/auth/register', credentails);
    }

    private setSession(authResult: AuthResult) {
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

    public getFullName() {
        const user = this.getUser();
        if (user) return `${user.name} ${user.surname}`;
        else return null;
    }

    public getName() {
        const user = this.getUser();
        if (user) return user.name;
        else return null;
    }

    public getSurname() {
        const user = this.getUser();
        if (user) return user.surname;
        else return null;
    }

    public getGroup() {
        const user = this.getUser();
        if (user) return user.group;
        else return null;
    }

    public getEmail() {
        const user = this.getUser();
        if (user) return user.email;
        else return null;
    }
}
