import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Pupil } from 'src/app/core/models';
import { PupilsService } from 'src/app/core/services';
import { selectBetween } from 'src/app/shared/components/multiselect-checkbox/multiselect-checkbox.component';
import { PupilFormSuccessDialogComponent } from '../../components/pupil-form-success-dialog/pupil-form-success-dialog.component';

@Component({
    selector: 'app-pupil-form',
    templateUrl: './pupil-form.component.html',
    styleUrls: ['./pupil-form.component.scss'],
})
export class PupilFormComponent {
    contactForm: FormGroup;
    parentForm: FormGroup;
    lessonsForm: FormGroup;
    clausesForm: FormGroup;

    wybranePrzedmioty: string[] = [];

    constructor(private pupils: PupilsService, private dialog: MatDialog, private location: Location) {
        this.initializeForms();

        this.lessonsForm
            .get('needs')!
            .valueChanges.pipe(
                map((o: { [name: string]: boolean }) => {
                    let a: string[] = [];
                    for (let x in o) {
                        if (o[x]) a.push(x);
                    }
                    return a;
                })
            )
            ?.subscribe((wybranePrzedmioty) => (this.wybranePrzedmioty = wybranePrzedmioty));
    }

    submit() {
        if (this.contactForm.valid && this.parentForm.valid && this.lessonsForm.valid && this.clausesForm.valid) {
            let pupil = new Pupil();
            Object.assign(pupil, this.contactForm.value, this.parentForm.value);
            pupil.mainNeeds = this.lessonsForm.value.mainNeeds;
            pupil.remoteOrStationary = this.lessonsForm.value.remoteOrStationary;
            if (this.lessonsForm.value.alreadyAttended) pupil.notes = `Uczęszczał(a) na korepetycje wcześniej`;
            if (this.lessonsForm.value.previousTutor) pupil.notes += ' z ' + this.lessonsForm.value.previousTutor;
            pupil.needs = Object.keys(this.lessonsForm.value.needs)
                .filter((v) => this.lessonsForm.value.needs[v])
                .join(', ');
            this.pupils.createPupil(pupil).subscribe(() => {
                const dialogRef = this.dialog.open(PupilFormSuccessDialogComponent, { width: '500px' });
                dialogRef.afterClosed().subscribe(() => this.location.back());
            });
        }
    }

    private initializeForms() {
        this.contactForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.email, Validators.required]),
            class: new FormControl(),
            phone: new FormControl(),
            isMature: new FormControl(false),
        });

        this.parentForm = new FormGroup({
            parentName: new FormControl(),
            parentEmail: new FormControl(null, Validators.email),
            parentPhone: new FormControl(),
        });

        this.lessonsForm = new FormGroup({
            needs: new FormControl(
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
            mainNeeds: new FormControl(),
            remoteOrStationary: new FormControl(null, Validators.required),
            alreadyAttended: new FormControl(false),
            previousTutor: new FormControl(),
        });

        this.clausesForm = new FormGroup({
            clause1: new FormControl(false, Validators.requiredTrue),
            clause2: new FormControl(false, Validators.requiredTrue),
            clause3: new FormControl(false, Validators.requiredTrue),
        });
    }
}
