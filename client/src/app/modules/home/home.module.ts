import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { UserAddDialogComponent } from './components/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home/home.page';
import { LoginPageComponent } from './pages/login/login.page';
import { UsersPageComponent } from './pages/users/users.page';

@NgModule({
    declarations: [
        HomePageComponent,
        LoginPageComponent,
        UsersPageComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
        UsersListComponent,
    ],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, HomeRoutingModule],
})
export class HomeModule {}
