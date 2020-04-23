import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(private router: Router, protected authService: AuthService) {}

    homeRedirect() {
        this.router.navigateByUrl('/');
    }

    loginRedirect() {
        this.authService.loginRedirect('/python');
    }

    logout() {
        this.authService.logout();
    }
}
