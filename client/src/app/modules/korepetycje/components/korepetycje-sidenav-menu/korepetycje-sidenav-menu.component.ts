import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-korepetycje-sidenav-menu',
    templateUrl: './korepetycje-sidenav-menu.component.html',
    styleUrls: ['./korepetycje-sidenav-menu.component.scss'],
})
export class KorepetycjeSidenavMenuComponent {
    username: string;

    constructor(public authService: AuthService, private router: Router) {
        this.username = authService.getName() || '';
    }

    homeRedirect() {
        this.router.navigate(['/korepetycje']);
    }

    usersRedirect() {
        this.router.navigate(['/users']);
    }

    logout() {
        this.authService.logout();
    }
}
