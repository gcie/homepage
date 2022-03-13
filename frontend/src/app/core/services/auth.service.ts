import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { AuthResult } from '../models/auth-result';
import { Role } from '../models/role.enum';
import { User, UserLoginData, UserRegisterData } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private redirectUrl?: string;

    constructor(private http: HttpClient, private router: Router) {}

    public setRedirectUrl(url: string) {
        this.redirectUrl = url;
    }

    public getRedirectUrl() {
        const url = this.redirectUrl;
        this.redirectUrl = undefined;
        return url;
    }

    public loginRedirect(returnUrl: string) {
        this.redirectUrl = returnUrl;
        this.router.navigateByUrl('/login');
    }

    public login(credentials: UserLoginData) {
        return this.http.post<AuthResult>('/auth/login', credentials).pipe(map(this.setSession));
    }

    public register(credentails: UserRegisterData) {
        return this.http.post<AuthResult>('/api/users', credentails);
    }

    private setSession(authResult: AuthResult) {
        console.log('Authentication result:');
        console.log(authResult);
        const expiresAt = moment().add(authResult.expiresIn, 'seconds');

        localStorage.setItem('user', JSON.stringify(authResult.user));
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    public logout() {
        localStorage.removeItem('token');
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

    public hasRole(role: Role): boolean {
        if (this.getRoles()?.includes(role) || this.getRoles()?.includes(Role.Admin)) return true;
        return false;
    }

    public getUser(): User | null {
        if (!this.isLoggedIn()) return null;
        return JSON.parse(localStorage.getItem('user') || 'null');
    }

    public getName() {
        return this.getUser()?.name;
    }

    public getRoles() {
        return this.getUser()?.roles;
    }

    public getEmail() {
        return this.getUser()?.email;
    }
}
