import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PermissionGroup } from './user/permission-group.enum';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['login']);
            return false;
        } else if (this.authService.getGroup() !== PermissionGroup.admin) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
