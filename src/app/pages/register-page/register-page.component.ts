import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required]
        });
    }

    onSubmit(data: { name: string; surname: string; email: string; password: string }) {
        this.authService.register(data);
    }
}
