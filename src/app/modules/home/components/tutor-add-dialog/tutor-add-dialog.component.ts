import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TutorsService } from 'src/app/core/services';

@Component({
    selector: 'app-tutor-add-dialog',
    templateUrl: './tutor-add-dialog.component.html',
    styleUrls: ['./tutor-add-dialog.component.scss']
})
export class TutorAddDialogComponent {
    tutorForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<TutorAddDialogComponent>,
        private formBuilder: FormBuilder,
        private tutorsService: TutorsService
    ) {
        this.tutorForm = this.formBuilder.group({
            name: ['Adam Adamowski', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.pattern('[0-9]*')],
            teaches: '',
            notes: ''
        });
    }

    onSubmit() {
        if (this.tutorForm.valid) {
            this.tutorsService.createTutor(this.tutorForm.value).subscribe(() => {
                this.dialogRef.close();
            });
        }
    }
}
