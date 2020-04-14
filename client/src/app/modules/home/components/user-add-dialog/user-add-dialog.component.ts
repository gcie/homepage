import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth';

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
            email: ['', Validators.email],
            password: ['', Validators.required]
        });
    }

    onSubmit(data: { name: string; email: string; password: string }) {
        this.authService.register(data).subscribe((_result) => {
            this.dialogRef.close();
        });
    }
}
