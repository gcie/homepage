import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PupilsService } from '../pupils.service';

@Component({
    selector: 'app-pupil-add-dialog',
    templateUrl: './pupil-add-dialog.component.html',
    styleUrls: ['./pupil-add-dialog.component.scss']
})
export class PupilAddDialogComponent {
    pupilForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<PupilAddDialogComponent>,
        private formBuilder: FormBuilder,
        private pupilsService: PupilsService
    ) {
        this.pupilForm = this.formBuilder.group({
            name: ['Adam Adamowski', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.pattern('[0-9]*')],
            class: '',
            needs: '',
            notes: ''
        });
    }

    onSubmit() {
        if (this.pupilForm.valid) {
            this.pupilsService.createPupil(this.pupilForm.value).subscribe(() => {
                this.dialogRef.close();
            });
        }
    }
}
