import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pupil } from '../pupil';

@Component({
    selector: 'app-pupil-delete-confirm-dialog',
    templateUrl: './pupil-delete-confirm-dialog.component.html',
    styleUrls: ['./pupil-delete-confirm-dialog.component.scss']
})
export class PupilDeleteConfirmDialogComponent {
    constructor(public dialogRef: MatDialogRef<PupilDeleteConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public pupil: Pupil) {}
}
