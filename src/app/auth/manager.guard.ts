import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PermissionGroup } from './user/permission-group.enum';

@Injectable({
    providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['login']);
            return false;
        }
        const group = this.authService.getGroup();
        if (group !== PermissionGroup.manager && group !== PermissionGroup.admin) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
