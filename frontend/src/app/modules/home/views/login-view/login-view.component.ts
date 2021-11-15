import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginData } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login-view',
    templateUrl: './login-view.component.html',
    styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent {
    loginForm: FormGroup;
    errorMessage?: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.email],
            password: ['', Validators.required],
        });
    }

    onSubmit(credentials: UserLoginData) {
        this.authService.login(credentials).subscribe({
            next: () => {
                const url = this.authService.getRedirectUrl();
                this.router.navigateByUrl(url || '/');
            },
            error: (err) => {
                console.log(err.error);
                this.errorMessage = err.error.message;
            },
        });
    }
}
