import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { ErrorsService, UsersService } from 'src/app/core/services';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { UserAddDialogComponent } from '../user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'email', 'group', 'options'];
    usersDataSource = new MatTableDataSource<User>([]);

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatInput, { static: true }) filterInput: MatInput;

    constructor(private usersService: UsersService, private dialog: MatDialog, private error: ErrorsService) {}

    ngOnInit() {
        this.refreshUsersList();
        this.usersDataSource.paginator = this.paginator;
    }

    private refreshUsersList = () => {
        this.usersService.getUsers().subscribe({
            next: (users: User[]) => (this.usersDataSource.data = users),
            error: this.error.snack,
        });
    };

    filter() {
        this.usersDataSource.filter = this.filterInput.value.trim().toLowerCase();
    }

    clearFilter() {
        this.filterInput.value = '';
        this.filter();
    }

    addUser() {
        const dialogRef = this.dialog.open(UserAddDialogComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().toPromise().then(this.refreshUsersList);
    }

    editUser(user: User) {
        const dialogRef = this.dialog.open(UserEditDialogComponent, {
            width: '500px',
            data: user,
        });

        dialogRef.afterClosed().toPromise().then(this.refreshUsersList);
    }

    deleteUser(user: User) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: `Czy na pewno chcesz usunąć użytkownika ${user.name}?`,
            },
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
