import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService, PermissionGroup } from 'src/app/core/auth';
import { TutorsService } from 'src/app/core/services/api/korepetycje';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Tutor } from 'src/app/shared/models';
import { TutorAddDialogComponent } from '../tutor-add-dialog/tutor-add-dialog.component';
import { TutorEditDialogComponent } from '../tutor-edit-dialog/tutor-edit-dialog.component';
import { flatMap, map } from 'rxjs/operators';
import { EMPTY, BehaviorSubject, fromEvent } from 'rxjs';
import { ErrorsService } from 'src/app/core/services/utils/errors.service';

@Component({
    selector: 'app-tutors-list',
    templateUrl: './tutors-list.component.html',
    styleUrls: ['./tutors-list.component.scss']
})
export class TutorsListComponent implements OnInit {
    @Output() tutorClicked = new EventEmitter<Tutor>();

    tutors: Tutor[] = [];
    displayedColumns: string[] = ['name', 'email', 'teaches', 'assignedPupilName', 'notes'];
    mobileView: BehaviorSubject<boolean> = new BehaviorSubject(document.body.offsetWidth <= 1199);

    constructor(
        public authService: AuthService,
        private tutorsService: TutorsService,
        private dialog: MatDialog,
        private error: ErrorsService
    ) {
        if (this.authService.hasPermission(PermissionGroup.korepetycje_manager)) this.displayedColumns.push('options');
    }

    ngOnInit() {
        this.refreshTutorsList();
        const checkScreenSize = () => document.body.offsetWidth <= 1199;
        fromEvent(window, 'resize')
            .pipe(map(checkScreenSize))
            .subscribe((mobileView) => this.mobileView.next(mobileView));
    }

    rowClicked(tutor: Tutor) {
        this.tutorClicked.emit(tutor);
    }

    refreshTutorsList() {
        this.tutorsService.getTutors().subscribe({
            next: (tutors: Tutor[]) => (this.tutors = tutors),
            error: (err) => this.error.snack(err.error.message)
        });
    }

    addTutorDialog() {
        const addTutorDialogRef = this.dialog.open(TutorAddDialogComponent, {
            width: '700px'
        });

        addTutorDialogRef.afterClosed().subscribe(this.refreshTutorsList.bind(this));
    }

    editTutor(tutor: Tutor) {
        const dialogRef = this.dialog.open(TutorEditDialogComponent, {
            width: '700px',
            data: tutor
        });

        dialogRef.afterClosed().subscribe(this.refreshTutorsList.bind(this));
    }

    deleteTutor(tutor: Tutor) {
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
            .subscribe(this.refreshTutorsList.bind(this));
    }
}
