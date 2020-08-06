import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { KorepetycjeHeaderComponent } from './components/korepetycje-header/korepetycje-header.component';
import { KorepetycjeSidenavMenuComponent } from './components/korepetycje-sidenav-menu/korepetycje-sidenav-menu.component';
import { PupilAddDialogComponent } from './components/pupil-add-dialog/pupil-add-dialog.component';
import { PupilDetailedViewComponent } from './components/pupil-detailed-view/pupil-detailed-view.component';
import { PupilEditDialogComponent } from './components/pupil-edit-dialog/pupil-edit-dialog.component';
import { PupilsListComponent } from './components/pupils-list/pupils-list.component';
import { TutorAddDialogComponent } from './components/tutor-add-dialog/tutor-add-dialog.component';
import { TutorDetailedViewComponent } from './components/tutor-detailed-view/tutor-detailed-view.component';
import { TutorEditDialogComponent } from './components/tutor-edit-dialog/tutor-edit-dialog.component';
import { TutorsListComponent } from './components/tutors-list/tutors-list.component';
import { KorepetycjeRoutingModule } from './korepetycje-routing.module';
import { KorepetycjeHomeComponent } from './views/korepetycje-home/korepetycje-home.component';

@NgModule({
    declarations: [
        KorepetycjeHomeComponent,
        KorepetycjeHeaderComponent,
        KorepetycjeSidenavMenuComponent,
        PupilAddDialogComponent,
        PupilEditDialogComponent,
        PupilsListComponent,
        TutorAddDialogComponent,
        TutorEditDialogComponent,
        TutorsListComponent,
        PupilDetailedViewComponent,
        TutorDetailedViewComponent,
    ],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, KorepetycjeRoutingModule],
})
export class KorepetycjeModule {}
