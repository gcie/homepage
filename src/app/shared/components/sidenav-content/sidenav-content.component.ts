import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';

@Component({
    selector: 'app-sidenav-content',
    templateUrl: './sidenav-content.component.html',
    styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent {
    username: string;

    constructor(public authService: AuthService, private router: Router) {
        this.username = authService.getFullName() || '';
    }

    homeRedirect() {
        this.router.navigate(['/']);
    }

    usersRedirect() {
        this.router.navigate(['/users']);
    }
}
