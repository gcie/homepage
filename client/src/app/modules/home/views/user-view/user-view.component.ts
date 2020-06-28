import { Component, OnInit } from '@angular/core';
import * as md5 from 'md5';
import { AuthService } from 'src/app/core/auth';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
    GRAVATAR_URI: string;

    constructor(public authService: AuthService) {
        const hash = md5(authService.getEmail()?.toLowerCase());
        this.GRAVATAR_URI = `https://www.gravatar.com/avatar/${hash}?s=600&d=mp`;
    }

    ngOnInit(): void {}
}
