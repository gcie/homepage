import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user/user';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteConfirmDialogComponent } from '../user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    displayedColumns: string[] = ['name', 'surname', 'email', 'group', 'options'];

    constructor(private usersService: UsersService, private dialog: MatDialog) {}

    ngOnInit() {
        this.usersService.getUsers().then((users: User[]) => {
            this.users = users;
        });
    }

    addUser() {
        const dialogRef = this.dialog.open(UserAddDialogComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            this.usersService.getUsers().then((users: User[]) => (this.users = users));
        });
    }

    deleteUser(user) {
        const dialogRef = this.dialog.open(UserDeleteConfirmDialogComponent, {
            width: '300px',
            data: user
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.usersService
                    .deleteUser(user._id)
                    .then(() => {
                        this.usersService.getUsers().then((users: User[]) => (this.users = users));
                    })
                    .catch(console.log);
            }
            console.log(result);
        });
    }
}
