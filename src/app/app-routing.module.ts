import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PupilAddDialogComponent } from './pupils/pupil-add-dialog/pupil-add-dialog.component';
import { PupilEditDialogComponent } from './pupils/pupil-edit-dialog/pupil-edit-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { UserAddDialogComponent } from './users/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './users/user-edit-dialog/user-edit-dialog.component';
import { UsersPageComponent } from './users/users-page/users-page.component';

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
        ConfirmDialogComponent,
        PupilAddDialogComponent,
        PupilEditDialogComponent,
        UserAddDialogComponent,
        UserEditDialogComponent
    ]
})
export class AppRoutingModule {}
