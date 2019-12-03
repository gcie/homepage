import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-user-add-dialog',
    templateUrl: './user-add-dialog.component.html',
    styleUrls: ['./user-add-dialog.component.scss']
})
export class UserAddDialogComponent {
    registerForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<UserAddDialogComponent>,
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required]
        });
    }

    onSubmit(data: { name: string; surname: string; email: string; password: string }) {
        this.authService.register(data).subscribe((result) => {
            this.dialogRef.close();
        });
    }
}
