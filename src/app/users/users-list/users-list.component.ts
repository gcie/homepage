import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/user/user';
import { ErrorsService } from 'src/app/utils/errors.service';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';
import { UserDeleteConfirmDialogComponent } from '../user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    displayedColumns: string[] = ['name', 'surname', 'email', 'group', 'options'];

    constructor(private usersService: UsersService, private dialog: MatDialog, private error: ErrorsService) {}

    ngOnInit() {
        this.usersService.getUsers().subscribe({
            next: (users: User[]) => {
                this.users = users;
            },
            error: this.error.snack
        });
    }

    private refreshUsersList = () => {
        this.usersService.getUsers().subscribe({
            next: (users: User[]) => (this.users = users),
            error: this.error.snack
        });
    };

    addUser() {
        const dialogRef = this.dialog.open(UserAddDialogComponent, {
            width: '500px'
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then(this.refreshUsersList);
    }

    editUser(user) {
        const dialogRef = this.dialog.open(UserEditDialogComponent, {
            width: '500px',
            data: user
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then(this.refreshUsersList);
    }

    deleteUser(user) {
        const dialogRef = this.dialog.open(UserDeleteConfirmDialogComponent, {
            width: '300px',
            data: user
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then((result) => {
                if (result) return this.usersService.deleteUser(user._id).toPromise();
                else return '';
            })
            .then(this.refreshUsersList);
    }
}
