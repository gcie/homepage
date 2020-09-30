import { Location } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioButton } from '@angular/material/radio';
import { map } from 'rxjs/operators';
import { Tutor } from 'src/app/core/models';
import { TutorsService } from 'src/app/core/services';
import { selectBetween } from 'src/app/shared/components';
import { FormSuccessDialogComponent } from '../../components/form-success-dialog/form-success-dialog.component';

@Component({
    selector: 'app-tutor-form',
    templateUrl: './tutor-form.component.html',
    styleUrls: ['./tutor-form.component.scss'],
})
export class TutorFormComponent {
    contactForm: FormGroup;
    lessonsForm: FormGroup;
    clausesForm: FormGroup;

    subjects: string[] = [];

    @ViewChildren('level') levelCheckboxes: QueryList<MatRadioButton>;

    constructor(private tutors: TutorsService, private dialog: MatDialog, private location: Location) {
        this.contactForm = new FormGroup({
            name: new FormControl('Adam test', Validators.required),
            email: new FormControl('adam@mada.com', [Validators.email, Validators.required]),
            phone: new FormControl(),
        });

        this.lessonsForm = new FormGroup({
            teaches: new FormControl(
                {
                    matematyka: false,
                    fizyka: false,
                    chemia: false,
                    biologia: false,
                    polski: false,
                    historia: false,
                    angielski: false,
                    niemiecki: false,
                },
                selectBetween(1, 20)
            ),
            remoteOrStationary: new FormControl(null, Validators.required),
        });

        this.clausesForm = new FormGroup({
            clause1: new FormControl(false, Validators.requiredTrue),
            clause2: new FormControl(false, Validators.requiredTrue),
            clause3: new FormControl(false, Validators.requiredTrue),
        });

        this.lessonsForm
            .get('teaches')!
            .valueChanges.pipe(
                map((o: { [name: string]: boolean }) => {
                    let a: string[] = [];
                    for (let x in o) {
                        if (o[x]) a.push(x);
                    }
                    return a;
                })
            )
            ?.subscribe((subjects) => {
                this.subjects = subjects;
                for (let subject of subjects) {
                    for (let control of [`${subject}-sp`, `${subject}-lo`, `${subject}-matura`])
                        if (!this.lessonsForm.contains(control)) this.lessonsForm.addControl(control, new FormControl(true));
                }
            });
    }

    submit(): void {
        if (this.contactForm.valid && this.lessonsForm.valid && this.clausesForm.valid) {
            const tutor = new Tutor();
            Object.assign(tutor, this.contactForm.value);
            tutor.remoteOrStationary = this.lessonsForm.value.remoteOrStationary;
            tutor.teaches = {};
            for (let subject in this.lessonsForm.value.teaches) {
                if (this.lessonsForm.value.teaches[subject])
                    tutor.teaches[subject] = {
                        sp: this.lessonsForm.value[`${subject}-sp`],
                        lo: this.lessonsForm.value[`${subject}-lo`],
                        matura: this.lessonsForm.value[`${subject}-matura`],
                    };
            }
            this.tutors.createTutor(tutor).subscribe(() => {
                const dialogRef = this.dialog.open(FormSuccessDialogComponent, {
                    width: '500px',
                    data: {
                        mode: 'tutor',
                        email: this.contactForm.value.email,
                    },
                });
                dialogRef.afterClosed().subscribe(() => this.location.back());
            });
        }
    }
}
