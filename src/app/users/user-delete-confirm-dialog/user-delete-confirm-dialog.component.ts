import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/auth/user/user';

@Component({
    selector: 'app-user-delete-confirm-dialog',
    templateUrl: './user-delete-confirm-dialog.component.html',
    styleUrls: ['./user-delete-confirm-dialog.component.scss']
})
export class UserDeleteConfirmDialogComponent {
    constructor(public dialogRef: MatDialogRef<UserDeleteConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public user: User) {}

    onNoClick() {
        this.dialogRef.close();
    }
}
