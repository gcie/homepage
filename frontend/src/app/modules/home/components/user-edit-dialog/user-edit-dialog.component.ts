import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/core/models/role.enum';
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services';

@Component({
    selector: 'app-user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent {
    editForm: FormGroup;
    availablePermissions: string[] = Object.keys(Role);
    userGroups: Role[];
    groupsString: string;

    constructor(
        private dialogRef: MatDialogRef<UserEditDialogComponent>,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        @Inject(MAT_DIALOG_DATA) public user: User,
    ) {
        this.editForm = this.formBuilder.group({
            name: [user.name, Validators.required],
            email: [user.email, Validators.email],
            password: [''],
            groups: [user.roles, Validators.required],
        });
        this.userGroups = user.roles;
        this.groupsString = this.userGroups.join(', ');
        // this.groupsString = this.userGroups.reduce((g1, g2) => `${g1}, ${g2}`);
        // this.groupsString = this.userGroups.toString();
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
