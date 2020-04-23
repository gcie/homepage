import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionGroup } from 'src/app/core/auth/models/permission-group.enum';
import { UsersService } from 'src/app/core/services';
import { User } from 'src/app/core/auth';

@Component({
    selector: 'app-user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent {
    editForm: FormGroup;
    availablePermissions: string[] = Object.keys(PermissionGroup);
    userGroups: PermissionGroup[];

    constructor(
        private dialogRef: MatDialogRef<UserEditDialogComponent>,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        @Inject(MAT_DIALOG_DATA) public user: User
    ) {
        this.editForm = this.formBuilder.group({
            name: [user.name, Validators.required],
            email: [user.email, Validators.email],
            password: [''],
            groups: [user.groups, Validators.required],
        });
        this.userGroups = user.groups;
    }

    onConfirmClick() {
        const data = this.editForm.value;
        data._id = this.user._id;

        this.usersService.updateUser(data).subscribe((_user) => {
            this.dialogRef.close();
        });
    }

    onCancelClick() {
        this.dialogRef.close();
    }
}
