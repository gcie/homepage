import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { selectBetween } from 'src/app/shared/components/multiselect-checkbox/multiselect-checkbox.component';

@Component({
    selector: 'app-pupil-new-form',
    templateUrl: './pupil-new-form.component.html',
    styleUrls: ['./pupil-new-form.component.scss'],
})
export class PupilNewFormComponent {
    contactFormGroup: FormGroup;
    pupilFormGroup: FormGroup;
    parentFormGroup: FormGroup;
    korepetycjeFormGroup: FormGroup;
    klauzuleForm: FormGroup;
    isParent = new FormControl(false);
    multiselectOptions = {
        test1: true,
        test2: false,
    };

    wybranePrzedmioty: string[] = [];

    constructor() {
        this.contactFormGroup = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.email, Validators.required]),
            school: new FormControl(),
            isMature: new FormControl(false),
        });

        this.parentFormGroup = new FormGroup({
            name: new FormControl(),
            email: new FormControl(null, Validators.email),
            phone: new FormControl(),
        });

        this.korepetycjeFormGroup = new FormGroup({
            przedmioty: new FormControl(
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
            mainPrzedmiot: new FormControl(),
            canRemotely: new FormControl(null, Validators.required),
            alreadyAttended: new FormControl(false),
            previousTutor: new FormControl(),
        });

        this.klauzuleForm = new FormGroup({
            clause1: new FormControl(false, Validators.requiredTrue),
            clause2: new FormControl(false, Validators.requiredTrue),
            clause3: new FormControl(false, Validators.requiredTrue),
        });

        this.korepetycjeFormGroup
            .get('przedmioty')!
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
}
