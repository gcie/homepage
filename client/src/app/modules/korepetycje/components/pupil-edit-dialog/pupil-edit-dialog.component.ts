import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PupilsService, TutorsService } from 'src/app/core/services';
import { Pupil } from 'src/app/shared/models';

@Component({
    selector: 'app-pupil-edit-dialog',
    templateUrl: './pupil-edit-dialog.component.html',
    styleUrls: ['./pupil-edit-dialog.component.scss'],
})
export class PupilEditDialogComponent implements OnInit {
    editForm: FormGroup;
    tutorList: { _id?: string; name?: string }[];

    constructor(
        private dialogRef: MatDialogRef<PupilEditDialogComponent>,
        private formBuilder: FormBuilder,
        private pupilsService: PupilsService,
        private tutorsService: TutorsService,
        @Inject(MAT_DIALOG_DATA) public pupil: Pupil
    ) {
        this.editForm = this.formBuilder.group({
            name: [pupil.name, Validators.required],
            email: [pupil.email, Validators.email],
            phone: [pupil.phone, Validators.pattern('[0-9]*')],
            class: pupil.class,
            needs: pupil.needs,
            notes: pupil.notes,
            parentName: pupil.parentName,
            parentEmail: pupil.parentEmail,
            parentPhone: pupil.parentPhone,
            lessonsStatus: pupil.lessonsStatus,
            assignedTutorId: pupil.assignedTutorId,
            assignedTutorName: pupil.assignedTutorName,
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

    ngOnInit() {
        this.tutorsService.getTutors(true).subscribe((tutors) => {
            this.tutorList = tutors as { _id?: string; name?: string }[];
            if (this.pupil.assignedTutorId) {
                this.tutorList.unshift({ _id: this.pupil.assignedTutorId, name: this.pupil.assignedTutorName });
            }
            this.tutorList.unshift({ _id: undefined, name: '<brak>' });
        });
    }
}
