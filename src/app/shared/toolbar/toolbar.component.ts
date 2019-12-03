import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    @Input() sidenav: MatSidenav;
    loggedIn: boolean;

    constructor(private authService: AuthService) {
        this.loggedIn = authService.isLoggedIn();
    }

    logout() {
        this.authService.logout();
    }
}
