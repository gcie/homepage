import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/api/korepetycje';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { User } from 'src/app/core/auth/models/user';
import { ErrorsService } from 'src/app/core/services/utils/errors.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    displayedColumns: string[] = ['name', 'email', 'group', 'options'];

    constructor(private usersService: UsersService, private dialog: MatDialog, private error: ErrorsService) {}

    ngOnInit() {
        this.refreshUsersList();
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

    editUser(user: User) {
        const dialogRef = this.dialog.open(UserEditDialogComponent, {
            width: '500px',
            data: user
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then(this.refreshUsersList);
    }

    deleteUser(user: User) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: `Czy na pewno chcesz usunąć użytkownika ${user.name}?`
            }
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
