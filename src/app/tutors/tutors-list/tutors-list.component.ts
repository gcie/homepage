import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorsService } from 'src/app/utils/errors.service';
import { Tutor } from '../tutor';
import { TutorsService } from '../tutors.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TutorAddDialogComponent } from '../tutor-add-dialog/tutor-add-dialog.component';
import { TutorEditDialogComponent } from '../tutor-edit-dialog/tutor-edit-dialog.component';

@Component({
    selector: 'app-tutors-list',
    templateUrl: './tutors-list.component.html',
    styleUrls: ['./tutors-list.component.scss']
})
export class TutorsListComponent implements OnInit {
    tutors: Tutor[] = [];
    displayedColumns: string[] = ['name', 'email', 'teaches', 'notes'];

    constructor(
        private authService: AuthService,
        private tutorsService: TutorsService,
        private dialog: MatDialog,
        private error: ErrorsService
    ) {
        if (this.authService.isManager()) this.displayedColumns.push('options');
    }

    ngOnInit() {
        this.refreshTutorsList();
    }

    private refreshTutorsList = () => {
        this.tutorsService.getTutors().subscribe({
            next: (tutors: Tutor[]) => (this.tutors = tutors),
            error: this.error.snack
        });
    };

    addTutorDialog() {
        const addTutorDialogRef = this.dialog.open(TutorAddDialogComponent, {
            width: '700px'
        });

        addTutorDialogRef
            .afterClosed()
            .toPromise()
            .then(this.refreshTutorsList);
    }

    editTutor(tutor: Tutor) {
        const dialogRef = this.dialog.open(TutorEditDialogComponent, {
            width: '700px',
            data: tutor
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then(this.refreshTutorsList);
    }

    deleteTutor(tutor) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: `Czy na pewno chcesz usunąć korepetytora ${tutor.name}?`
            }
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then((result) => {
                if (result) return this.tutorsService.deleteTutor(tutor._id).toPromise();
                else return '';
            })
            .then(this.refreshTutorsList);
    }
}
