import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEditDialogComponent } from 'src/app/users/user-edit-dialog/user-edit-dialog.component';
import { PupilsService } from '../pupils.service';
import { Pupil } from '../pupil';

@Component({
    selector: 'app-pupil-edit-dialog',
    templateUrl: './pupil-edit-dialog.component.html',
    styleUrls: ['./pupil-edit-dialog.component.scss']
})
export class PupilEditDialogComponent {
    editForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<UserEditDialogComponent>,
        private formBuilder: FormBuilder,
        private pupilsService: PupilsService,
        @Inject(MAT_DIALOG_DATA) public pupil: Pupil
    ) {
        this.editForm = this.formBuilder.group({
            name: [pupil.name, Validators.required],
            email: [pupil.email, Validators.email],
            phone: [pupil.phone, Validators.pattern('[0-9]*')],
            class: pupil.class,
            needs: pupil.needs,
            notes: pupil.notes
        });
    }

    onConfirmClick() {
        const data = this.editForm.value;
        data._id = this.pupil._id;

        this.pupilsService.updatePupil(data).subscribe((_pupil) => {
            this.dialogRef.close();
        });
    }

    onCancelClick() {
        this.dialogRef.close();
    }
}
