import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
    registerForm: FormGroup;
    token: string;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) {
        this.registerForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.token = localStorage.getItem('id_token') || '';
    }

    onSubmit(data: { login: string; password: string }) {
        console.log(data);
        this.http.post('/signup', data).subscribe((res) => {
            console.log('res:');
            console.log(res);
        });
    }
}
