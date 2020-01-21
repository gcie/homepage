import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/auth';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() sidenav: MatSidenav;
    loggedIn: boolean;

    constructor(private authService: AuthService) {
        this.loggedIn = authService.isLoggedIn();
    }

    logout() {
        this.authService.logout();
    }
}
