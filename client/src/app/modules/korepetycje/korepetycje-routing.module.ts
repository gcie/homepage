import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorepetycjeUserGuard } from 'src/app/core/guards';
import { PupilAddDialogComponent } from './components/pupil-add-dialog/pupil-add-dialog.component';
import { PupilEditDialogComponent } from './components/pupil-edit-dialog/pupil-edit-dialog.component';
import { TutorAddDialogComponent } from './components/tutor-add-dialog/tutor-add-dialog.component';
import { TutorEditDialogComponent } from './components/tutor-edit-dialog/tutor-edit-dialog.component';
import { FormHomeComponent } from './views/form-home/form-home.component';
import { KorepetycjeHomeComponent } from './views/korepetycje-home/korepetycje-home.component';
import { ParentFormComponent } from './views/parent-form/parent-form.component';
import { PupilFormComponent } from './views/pupil-form/pupil-form.component';
import { TutorFormComponent } from './views/tutor-form/tutor-form.component';

const routes: Routes = [
    { path: '', component: KorepetycjeHomeComponent, canActivate: [KorepetycjeUserGuard] },
    { path: 'pupil', component: PupilFormComponent },
    { path: 'parent', component: ParentFormComponent },
    { path: 'tutor', component: TutorFormComponent },
    { path: 'formularz', component: FormHomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [
        KorepetycjeHomeComponent,
        PupilAddDialogComponent,
        PupilEditDialogComponent,
        TutorAddDialogComponent,
        TutorEditDialogComponent,
    ],
})
export class KorepetycjeRoutingModule {}
