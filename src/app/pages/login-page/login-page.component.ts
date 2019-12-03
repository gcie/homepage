import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserLoginData } from '../../auth/user/user-login-data';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.email],
            password: ['', Validators.required]
        });
    }

    onSubmit(credentials: UserLoginData) {
        this.authService.login(credentials).subscribe(() => {
            this.router.navigateByUrl('/');
        });
    }
}
