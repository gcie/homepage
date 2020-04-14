import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorepetycjeUserGuard } from 'src/app/core/guards';
import { PupilAddDialogComponent } from './components/pupil-add-dialog/pupil-add-dialog.component';
import { PupilEditDialogComponent } from './components/pupil-edit-dialog/pupil-edit-dialog.component';
import { TutorAddDialogComponent } from './components/tutor-add-dialog/tutor-add-dialog.component';
import { TutorEditDialogComponent } from './components/tutor-edit-dialog/tutor-edit-dialog.component';
import { KorepetycjeHomePageComponent } from './pages/korepetycje-home/korepetycje-home.page';

const routes: Routes = [{ path: '', component: KorepetycjeHomePageComponent, canActivate: [KorepetycjeUserGuard] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [
        KorepetycjeHomePageComponent,
        PupilAddDialogComponent,
        PupilEditDialogComponent,
        TutorAddDialogComponent,
        TutorEditDialogComponent,
    ],
})
export class KorepetycjeRoutingModule {}
