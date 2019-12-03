import { Component, OnInit } from '@angular/core';
import { PupilsService } from '../pupils.service';
import { Pupil } from '../pupil';
import { MatDialog } from '@angular/material/dialog';
import { PupilAddDialogComponent } from '../pupil-add-dialog/pupil-add-dialog.component';

@Component({
    selector: 'app-pupils-list',
    templateUrl: './pupils-list.component.html',
    styleUrls: ['./pupils-list.component.scss']
})
export class PupilsListComponent implements OnInit {
    pupils: Pupil[] = [];
    displayedColumns: string[] = ['name', 'email', 'phone', 'needs', 'class'];

    constructor(private pupilsService: PupilsService, private dialog: MatDialog) {}

    ngOnInit() {
        this.pupilsService.getPupils().then((pupils: Pupil[]) => {
            this.pupils = pupils;
        });
    }

    addPupilDialog() {
        const addPupilDialogRef = this.dialog.open(PupilAddDialogComponent, {
            width: '700px'
        });
        addPupilDialogRef.afterClosed().subscribe((result) => {
            console.log(result);

            this.pupilsService.getPupils().then((pupils: Pupil[]) => {
                this.pupils = pupils;
            });
        });
    }
}
