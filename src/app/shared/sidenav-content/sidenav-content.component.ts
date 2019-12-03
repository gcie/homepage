import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidenav-content',
    templateUrl: './sidenav-content.component.html',
    styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent {
    username: string;

    constructor(private authService: AuthService, private router: Router) {
        this.username = authService.getFullName() || '';
    }

    homeRedirect() {
        this.router.navigate(['/']);
    }

    usersRedirect() {
        this.router.navigate(['/users']);
    }
}
