import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PupilsService } from 'src/app/core/services';
import { Pupil } from 'src/app/shared/models';

@Component({
    selector: 'app-pupil-detailed-view',
    templateUrl: './pupil-detailed-view.component.html',
    styleUrls: ['./pupil-detailed-view.component.scss']
})
export class PupilDetailedViewComponent {
    @Input() pupil: Pupil;
    @Output() pupilChange = new EventEmitter<void>();

    constructor(private pupilsService: PupilsService) {}

    updatePupil(data, property: string) {
        switch (property) {
            case 'email':
                this.pupil.email = data;
                break;
            case 'parentName':
                this.pupil.parentName = data;
                break;
            case 'parentEmail':
                this.pupil.parentEmail = data;
                break;
            case 'phone':
                this.pupil.phone = data;
                break;
            case 'needs':
                this.pupil.needs = data;
                break;
            case 'class':
                this.pupil.class = data;
                break;
            case 'notes':
                this.pupil.notes = data;
                break;
        }

        this.pupilsService.updatePupil(this.pupil).subscribe((pupil) => {
            this.pupil = pupil;
            this.pupilChange.emit();
        });
    }
}
