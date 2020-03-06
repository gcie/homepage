import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TutorsService } from 'src/app/core/services/api/korepetycje';
import { Tutor } from 'src/app/shared/models';

@Component({
    selector: 'app-tutor-detailed-view',
    templateUrl: './tutor-detailed-view.component.html',
    styleUrls: ['./tutor-detailed-view.component.scss']
})
export class TutorDetailedViewComponent {
    @Input() tutor: Tutor;
    @Output() tutorChange = new EventEmitter<void>();

    constructor(private tutorsService: TutorsService) {}

    updateTutor(data: string, property: string) {
        switch (property) {
            case 'email':
                this.tutor.email = data;
                break;
            case 'phone':
                this.tutor.phone = data;
                break;
            case 'teaches':
                this.tutor.teaches = data;
                break;
            case 'notes':
                this.tutor.notes = data;
                break;
        }

        this.tutorsService.updateTutor(this.tutor).subscribe((tutor) => {
            this.tutor = tutor;
            this.tutorChange.emit();
        });
    }
}
