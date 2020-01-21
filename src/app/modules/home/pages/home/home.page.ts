import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePageComponent {
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
