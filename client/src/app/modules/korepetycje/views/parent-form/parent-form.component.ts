import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Pupil } from 'src/app/core/models';
import { PupilsService } from 'src/app/core/services';
import { selectBetween } from 'src/app/shared/components';
import { FormSuccessDialogComponent } from '../../components/form-success-dialog/form-success-dialog.component';

@Component({
    selector: 'app-parent-form',
    templateUrl: './parent-form.component.html',
    styleUrls: ['./parent-form.component.scss'],
})
export class ParentFormComponent {
    contactForm: FormGroup;
    pupilForm: FormGroup;
    clausesForm: FormGroup;

    wybranePrzedmioty: string[] = [];

    constructor(private pupils: PupilsService, private dialog: MatDialog, private location: Location) {
        this.initializeForms();

        this.pupilForm
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
        if (this.contactForm.valid && this.pupilForm.valid && this.clausesForm.valid) {
            let pupil = new Pupil();
            Object.assign(pupil, this.contactForm.value, this.pupilForm.value);
            pupil.contactEmail = this.contactForm.value.parentEmail;
            if (this.pupilForm.value.alreadyAttended) pupil.notes = `Uczęszczał(a) na korepetycje wcześniej`;
            if (this.pupilForm.value.previousTutor) pupil.notes += ' z ' + this.pupilForm.value.previousTutor;
            pupil.needs = Object.keys(this.pupilForm.value.needs)
                .filter((v) => this.pupilForm.value.needs[v])
                .join(', ');
            this.pupils.createPupil(pupil).subscribe(() => {
                const dialogRef = this.dialog.open(FormSuccessDialogComponent, {
                    width: '500px',
                    data: {
                        mode: 'parent',
                        email: this.contactForm.value.email,
                    },
                });
                dialogRef.afterClosed().subscribe(() => this.location.back());
            });
        }
    }

    private initializeForms() {
        this.contactForm = new FormGroup({
            parentName: new FormControl(null, Validators.required),
            parentEmail: new FormControl(null, [Validators.email, Validators.required]),
            parentPhone: new FormControl(),
        });

        this.pupilForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.email),
            phone: new FormControl(),
            class: new FormControl(null, Validators.required),
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
