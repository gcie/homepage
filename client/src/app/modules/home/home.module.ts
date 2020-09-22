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
import { HomeViewComponent } from './views/home-view/home-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { UsersViewComponent } from './views/users-view/users-view.component';
import { AdminConsoleViewComponent } from './views/admin-console-view/admin-console-view.component';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [
        HomeViewComponent,
        LoginViewComponent,
        UsersViewComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
        UsersListComponent,
        UserViewComponent,
        AdminConsoleViewComponent,
        HomeComponent,
    ],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, HomeRoutingModule],
})
export class HomeModule {}
