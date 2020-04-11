import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';
import { PermissionGroup } from '../auth/models/permission-group.enum';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
            this.authService.setRedirectUrl(state.url);
            this.router.navigateByUrl('/login');
            return false;
        } else if (!this.authService.hasPermission(PermissionGroup.admin)) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}
