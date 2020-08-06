import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-korepetycje-header',
    templateUrl: './korepetycje-header.component.html',
    styleUrls: ['./korepetycje-header.component.scss'],
})
export class KorepetycjeHeaderComponent {
    @Input() sidenav: MatSidenav;
    loggedIn: boolean;

    constructor(private authService: AuthService) {
        this.loggedIn = authService.isLoggedIn();
    }

    logout() {
        this.authService.logout();
    }
}
