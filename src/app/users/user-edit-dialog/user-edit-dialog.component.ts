import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { PermissionGroup } from 'src/app/auth/user/permission-group.enum';
import { User } from 'src/app/auth/user/user';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent {
    editForm: FormGroup;
    availablePermissions: string[] = Object.keys(PermissionGroup);
    userGroup: string;

    constructor(
        private dialogRef: MatDialogRef<UserEditDialogComponent>,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        @Inject(MAT_DIALOG_DATA) public user: any
    ) {
        this.editForm = this.formBuilder.group({
            name: [user.name, Validators.required],
            surname: [user.surname, Validators.required],
            email: [user.email, Validators.email],
            password: [''],
            group: [user.group, Validators.required]
        });
        this.userGroup = user.group;
    }

    onConfirmClick() {
        const data = this.editForm.value;
        data._id = this.user._id;

        this.usersService.updateUser(data).subscribe((user) => {
            this.dialogRef.close();
        });
    }

    onCancelClick() {
        this.dialogRef.close();
    }
}
