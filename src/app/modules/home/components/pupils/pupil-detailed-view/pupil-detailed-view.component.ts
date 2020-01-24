import { Component, Input, OnInit } from '@angular/core';
import { Pupil } from 'src/app/shared/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PupilsService } from 'src/app/core/services';

@Component({
    selector: 'app-pupil-detailed-view',
    templateUrl: './pupil-detailed-view.component.html',
    styleUrls: ['./pupil-detailed-view.component.scss']
})
export class PupilDetailedViewComponent {
    edited: string;

    @Input() pupil: Pupil;

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
        this.pupilsService.updatePupil(this.pupil).subscribe((pupil) => (this.pupil = pupil));
    }
}
