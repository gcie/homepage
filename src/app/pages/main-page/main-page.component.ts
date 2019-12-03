import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
    username: string | null;

    constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
        this.username = authService.getFullName();
    }

    registerRedirect() {
        this.router.navigateByUrl('register');
    }
    userRedirect() {
        this.http.get('/user').subscribe(console.log);
    }
}
