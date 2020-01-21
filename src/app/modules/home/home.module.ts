import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent, UsersPageComponent } from './pages';
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

@NgModule({
    declarations: [
        HomePageComponent,
        UsersPageComponent,
        PupilAddDialogComponent,
        PupilEditDialogComponent,
        PupilsListComponent,
        TutorAddDialogComponent,
        TutorEditDialogComponent,
        TutorsListComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
        UsersListComponent
    ],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, HomeRoutingModule]
})
export class HomeModule {}
