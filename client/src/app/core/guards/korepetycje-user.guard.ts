import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, PermissionGroup } from '../auth';

@Injectable({
    providedIn: 'root'
})
export class KorepetycjeUserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        } else if (!this.authService.hasPermission(PermissionGroup.korepetycje_user)) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
