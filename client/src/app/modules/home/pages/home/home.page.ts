import { Component, OnInit } from '@angular/core';
import { AuthService, User, PermissionGroup } from 'src/app/core/auth';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePageComponent implements OnInit {
    user: User;

    constructor(private authService: AuthService) {
        const user = this.authService.getUser();
        if (user) this.user = user;
        console.log(user);
        console.log(user?.groups.includes(PermissionGroup.korepetycje_user));
    }

    ngOnInit(): void {}

    logout() {
        this.authService.logout();
    }
}
