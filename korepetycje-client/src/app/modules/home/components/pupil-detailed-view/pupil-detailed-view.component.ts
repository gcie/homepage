import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PupilsService, TutorsService } from 'src/app/core/services';
import { Pupil, Tutor } from 'src/app/shared/models';

@Component({
    selector: 'app-pupil-detailed-view',
    templateUrl: './pupil-detailed-view.component.html',
    styleUrls: ['./pupil-detailed-view.component.scss']
})
export class PupilDetailedViewComponent implements OnInit {
    $pupil: BehaviorSubject<Pupil> = new BehaviorSubject(new Pupil());

    @Output() pupilChange = new EventEmitter<void>();

    tutorsList: Tutor[];
    selectedTutor?: string;
    tutorSelectMode = false;
    assignedTutorName: string;

    constructor(private pupilsService: PupilsService, private tutorsService: TutorsService) {}

    @Input() set pupil(pupil: Pupil) {
        this.selectedTutor = pupil.assignedTutorId;
        if (pupil.assignedTutorId) {
            this.tutorsService.getTutorById(pupil.assignedTutorId).subscribe((tutor) => (this.assignedTutorName = tutor.name));
        } else {
            this.assignedTutorName = '<brak>';
        }
        if (this.$pupil) {
            this.$pupil.next(pupil);
        } else {
            this.$pupil = new BehaviorSubject(pupil);
        }
    }

    get pupil() {
        return this.$pupil.value;
    }

    ngOnInit() {
        this.$pupil.subscribe(() => this.tutorsService.getTutors().subscribe((tutors) => (this.tutorsList = tutors)));
    }

    updatePupil(data: string, property: string) {
        switch (property) {
            case 'name':
                this.pupil.name = data;
                break;
            case 'email':
                this.pupil.email = data;
                break;
            case 'phone':
                this.pupil.phone = data;
                break;
            case 'parentName':
                this.pupil.parentName = data;
                break;
            case 'parentEmail':
                this.pupil.parentEmail = data;
                break;
            case 'parentPhone':
                this.pupil.parentPhone = data;
                break;
            case 'needs':
                this.pupil.needs = data;
                break;
            case 'class':
                this.pupil.class = data;
                break;
            case 'lessonsStatus':
                this.pupil.lessonsStatus = data;
                break;
            case 'notes':
                this.pupil.notes = data;
                break;
            case 'assignedTutorId':
                this.pupil.assignedTutorId = data;
                break;
        }
        this.pupilsService.updatePupil(this.pupil).subscribe((pupil) => {
            this.pupil = pupil;
            this.pupilChange.emit();
        });
    }
}
