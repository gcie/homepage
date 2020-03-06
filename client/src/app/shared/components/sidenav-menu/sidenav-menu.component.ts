import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';

@Component({
    selector: 'app-sidenav-menu',
    templateUrl: './sidenav-menu.component.html',
    styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent {
    username: string;

    constructor(public authService: AuthService, private router: Router) {
        this.username = authService.getName() || '';
    }

    homeRedirect() {
        this.router.navigate(['/']);
    }

    usersRedirect() {
        this.router.navigate(['/users']);
    }

    logout() {
        this.authService.logout();
    }
}
