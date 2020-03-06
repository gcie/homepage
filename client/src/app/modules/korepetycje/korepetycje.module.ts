import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import {
    PupilAddDialogComponent,
    PupilEditDialogComponent,
    PupilsListComponent,
    TutorAddDialogComponent,
    TutorEditDialogComponent,
    TutorsListComponent,
    UserAddDialogComponent,
    UserEditDialogComponent,
    UsersListComponent
} from './components';
import { PupilDetailedViewComponent } from './components/pupil-detailed-view/pupil-detailed-view.component';
import { TutorDetailedViewComponent } from './components/tutor-detailed-view/tutor-detailed-view.component';
import { HomePageComponent, UsersPageComponent } from './pages';
import { KorepetycjeRoutingModule } from './korepetycje-routing.module';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        HomePageComponent,
        UsersPageComponent,
        HeaderComponent,
        SidenavMenuComponent,
        PupilAddDialogComponent,
        PupilEditDialogComponent,
        PupilsListComponent,
        TutorAddDialogComponent,
        TutorEditDialogComponent,
        TutorsListComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
        UsersListComponent,
        PupilDetailedViewComponent,
        TutorDetailedViewComponent
    ],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, KorepetycjeRoutingModule]
})
export class KorepetycjeModule {}
