import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
    gravatarURI?: string;

    constructor(public userService: UserService, public authService: AuthService) {}

    ngOnInit(): void {
        this.userService.getGravatarURI().subscribe((gravatarURI) => (this.gravatarURI = gravatarURI));
    }
}
