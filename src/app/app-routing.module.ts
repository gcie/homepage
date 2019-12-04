import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PupilAddDialogComponent } from './pupils/pupil-add-dialog/pupil-add-dialog.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { UsersPageComponent } from './users/users-page/users-page.component';
import { UserDeleteConfirmDialogComponent } from './users/user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { UserAddDialogComponent } from './users/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './users/user-edit-dialog/user-edit-dialog.component';
import { PupilDeleteConfirmDialogComponent } from './pupils/pupil-delete-confirm-dialog/pupil-delete-confirm-dialog.component';

const routes: Routes = [
    { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent, canActivate: [AdminGuard] },
    { path: 'users', component: UsersPageComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    entryComponents: [
        PupilAddDialogComponent,
        UserDeleteConfirmDialogComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
        PupilDeleteConfirmDialogComponent
    ]
})
export class AppRoutingModule {}
