import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';
import { UserLoginData } from 'src/app/shared/models';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {
    loginForm: FormGroup;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.email],
            password: ['', Validators.required]
        });
    }

    onSubmit(credentials: UserLoginData) {
        this.authService.login(credentials).subscribe({
            next: () => {
                this.router.navigateByUrl('/');
            },
            error: (err) => {
                this.errorMessage = err.error.message;
            }
        });
    }
}
