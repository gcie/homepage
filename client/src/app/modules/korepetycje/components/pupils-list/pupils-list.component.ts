import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, fromEvent } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { AuthService, PermissionGroup } from 'src/app/core/auth';
import { ErrorsService, PupilsService, TutorsService } from 'src/app/core/services';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Pupil } from 'src/app/shared/models';
import { PupilAddDialogComponent } from '../pupil-add-dialog/pupil-add-dialog.component';
import { PupilEditDialogComponent } from '../pupil-edit-dialog/pupil-edit-dialog.component';

@Component({
    selector: 'app-pupils-list',
    templateUrl: './pupils-list.component.html',
    styleUrls: ['./pupils-list.component.scss'],
})
export class PupilsListComponent implements OnInit {
    @Output() pupilClicked = new EventEmitter<Pupil>();

    pupils: Pupil[] = [];
    displayedColumns: string[] = ['name', 'email', 'needs', 'class', 'assignedTutorName', 'lessonsStatus', 'notes'];
    mobileView: BehaviorSubject<boolean> = new BehaviorSubject(document.body.offsetWidth <= 1199);

    constructor(
        public authService: AuthService,
        private pupilsService: PupilsService,
        public tutorsService: TutorsService,
        private dialog: MatDialog,
        private error: ErrorsService
    ) {
        if (this.authService.hasPermission(PermissionGroup.korepetycje_manager)) this.displayedColumns.push('options');
    }

    ngOnInit() {
        this.refreshPupilsList();
        const checkScreenSize = () => document.body.offsetWidth <= 1199;
        fromEvent(window, 'resize')
            .pipe(map(checkScreenSize))
            .subscribe((mobileView) => this.mobileView.next(mobileView));
    }

    rowClicked(pupil: Pupil) {
        this.pupilClicked.emit(pupil);
    }

    refreshPupilsList() {
        this.pupilsService.getPupils().subscribe({
            next: (pupils: Pupil[]) => (this.pupils = pupils),
            error: (err) => {
                console.log(err);
                this.error.snack(err.error.message);
            },
        });
    }

    addPupilDialog() {
        const addPupilDialogRef = this.dialog.open(PupilAddDialogComponent, {
            width: '700px',
        });

        addPupilDialogRef.afterClosed().subscribe(this.refreshPupilsList.bind(this));
    }

    editPupil(pupil: Pupil) {
        const dialogRef = this.dialog.open(PupilEditDialogComponent, {
            width: '700px',
            data: pupil,
        });

        dialogRef.afterClosed().subscribe(this.refreshPupilsList.bind(this));
    }

    deletePupil(pupil: Pupil) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                message: `Czy na pewno chcesz usunąć ucznia ${pupil.name}?`,
            },
        });

        dialogRef
            .afterClosed()
            .pipe(
                flatMap((result) => {
                    if (result) return this.pupilsService.deletePupil(pupil._id);
                    else return EMPTY;
                })
            )
            .subscribe(this.refreshPupilsList.bind(this));
    }
}
