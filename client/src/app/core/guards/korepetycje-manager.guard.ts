import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, PermissionGroup } from '../auth';

@Injectable({
    providedIn: 'root',
})
export class KorepetycjeManagerGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
            this.authService.setRedirectUrl(state.url);
            this.router.navigateByUrl('/login');
            return false;
        } else if (!this.authService.hasPermission(PermissionGroup.korepetycje_manager)) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}
