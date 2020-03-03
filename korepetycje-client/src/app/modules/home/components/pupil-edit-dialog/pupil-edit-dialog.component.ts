import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PupilsService } from 'src/app/core/services';
import { Pupil } from 'src/app/shared/models';

@Component({
    selector: 'app-pupil-edit-dialog',
    templateUrl: './pupil-edit-dialog.component.html',
    styleUrls: ['./pupil-edit-dialog.component.scss']
})
export class PupilEditDialogComponent {
    editForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<PupilEditDialogComponent>,
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
        Object.assign(this.pupil, this.editForm.value);

        this.pupilsService.updatePupil(this.pupil).subscribe((_pupil) => {
            this.dialogRef.close();
        });
    }

    onCancelClick() {
        this.dialogRef.close();
    }
}
