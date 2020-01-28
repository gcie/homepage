import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth';
import { ErrorsService, TutorsService } from 'src/app/core/services';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Tutor } from 'src/app/shared/models';
import { TutorAddDialogComponent } from '../tutor-add-dialog/tutor-add-dialog.component';
import { TutorEditDialogComponent } from '../tutor-edit-dialog/tutor-edit-dialog.component';
import { flatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'app-tutors-list',
    templateUrl: './tutors-list.component.html',
    styleUrls: ['./tutors-list.component.scss']
})
export class TutorsListComponent implements OnInit {
    @Output() tutorClicked = new EventEmitter<Tutor>();

    tutors: Tutor[] = [];
    displayedColumns: string[] = ['name', 'email', 'teaches', 'notes'];

    constructor(
        public authService: AuthService,
        private tutorsService: TutorsService,
        private dialog: MatDialog,
        private error: ErrorsService
    ) {
        if (this.authService.isManager()) this.displayedColumns.push('options');
    }

    ngOnInit() {
        this.refreshTutorsList();
    }

    rowClicked(tutor: Tutor) {
        this.tutorClicked.emit(tutor);
    }

    refreshTutorsList = () => {
        this.tutorsService.getTutors().subscribe({
            next: (tutors: Tutor[]) => (this.tutors = tutors),
            error: this.error.snack
        });
    };

    addTutorDialog() {
        const addTutorDialogRef = this.dialog.open(TutorAddDialogComponent, {
            width: '700px'
        });

        addTutorDialogRef.afterClosed().subscribe(this.refreshTutorsList);
    }

    editTutor(tutor: Tutor) {
        const dialogRef = this.dialog.open(TutorEditDialogComponent, {
            width: '700px',
            data: tutor
        });

        dialogRef.afterClosed().subscribe(this.refreshTutorsList);
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
            .pipe(
                flatMap((result) => {
                    if (result) return this.tutorsService.deleteTutor(tutor._id).toPromise();
                    else return EMPTY;
                })
            )
            .subscribe(this.refreshTutorsList);
    }
}
