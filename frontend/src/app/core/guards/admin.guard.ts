import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/role.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
            this.authService.setRedirectUrl(state.url);
            this.router.navigateByUrl('/login');
            return false;
        } else if (!this.authService.hasRole(Role.Admin)) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}
