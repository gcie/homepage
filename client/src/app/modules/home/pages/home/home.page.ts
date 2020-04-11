import { Component, OnInit } from '@angular/core';
import { AuthService, User, PermissionGroup } from 'src/app/core/auth';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePageComponent implements OnInit {
    user: User;
    loggedIn: boolean;

    constructor(private authService: AuthService) {
        const user = this.authService.getUser();
        this.loggedIn = this.authService.isLoggedIn();
        if (user) this.user = user;
        console.log(user);
    }

    ngOnInit(): void {}

    logout() {
        this.authService.logout();
    }
}
