import { Component, OnInit } from '@angular/core';
import { PupilsService } from '../pupils.service';
import { Pupil } from '../pupil';
import { MatDialog } from '@angular/material/dialog';
import { PupilAddDialogComponent } from '../pupil-add-dialog/pupil-add-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
import { PupilDeleteConfirmDialogComponent } from '../pupil-delete-confirm-dialog/pupil-delete-confirm-dialog.component';
import { ErrorsService } from 'src/app/utils/errors.service';
import { PupilEditDialogComponent } from '../pupil-edit-dialog/pupil-edit-dialog.component';

@Component({
    selector: 'app-pupils-list',
    templateUrl: './pupils-list.component.html',
    styleUrls: ['./pupils-list.component.scss']
})
export class PupilsListComponent implements OnInit {
    pupils: Pupil[] = [];
    displayedColumns: string[] = ['name', 'email', 'phone', 'needs', 'class'];

    constructor(
        private authService: AuthService,
        private pupilsService: PupilsService,
        private dialog: MatDialog,
        private error: ErrorsService
    ) {
        if (this.authService.isManager()) this.displayedColumns.push('options');
    }

    ngOnInit() {
        this.refreshPupilsList();
    }

    private refreshPupilsList = () => {
        this.pupilsService.getPupils().subscribe({
            next: (pupils: Pupil[]) => (this.pupils = pupils),
            error: this.error.snack
        });
    };

    addPupilDialog() {
        const addPupilDialogRef = this.dialog.open(PupilAddDialogComponent, {
            width: '700px'
        });

        addPupilDialogRef
            .afterClosed()
            .toPromise()
            .then(this.refreshPupilsList);
    }

    editPupil(pupil: Pupil) {
        const dialogRef = this.dialog.open(PupilEditDialogComponent, {
            width: '700px',
            data: pupil
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then(this.refreshPupilsList);
    }

    deletePupil(pupil) {
        const dialogRef = this.dialog.open(PupilDeleteConfirmDialogComponent, {
            width: '300px',
            data: pupil
        });

        dialogRef
            .afterClosed()
            .toPromise()
            .then((result) => {
                if (result) return this.pupilsService.deletePupil(pupil._id).toPromise();
                else return '';
            })
            .then(this.refreshPupilsList);
    }
}
