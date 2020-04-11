import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEditDialogComponent } from '..';
import { TutorsService } from 'src/app/core/services/api/korepetycje';
import { Tutor } from 'src/app/shared/models';

@Component({
    selector: 'app-tutor-edit-dialog',
    templateUrl: './tutor-edit-dialog.component.html',
    styleUrls: ['./tutor-edit-dialog.component.scss']
})
export class TutorEditDialogComponent {
    editForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<UserEditDialogComponent>,
        private formBuilder: FormBuilder,
        private tutorsService: TutorsService,
        @Inject(MAT_DIALOG_DATA) public tutor: Tutor
    ) {
        this.editForm = this.formBuilder.group({
            name: [tutor.name, Validators.required],
            email: [tutor.email, Validators.email],
            phone: [tutor.phone, Validators.pattern('[0-9]*')],
            teaches: tutor.teaches,
            notes: tutor.notes
        });
    }

    onConfirmClick() {
        Object.assign(this.tutor, this.editForm.value);

        this.tutorsService.updateTutor(this.tutor).subscribe((_tutor) => {
            this.dialogRef.close();
        });
    }

    onCancelClick() {
        this.dialogRef.close();
    }
}