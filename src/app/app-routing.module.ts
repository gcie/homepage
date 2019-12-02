import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PupilAddDialogComponent } from './pupils/pupil-add-dialog/pupil-add-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    entryComponents: [PupilAddDialogComponent]
})
export class AppRoutingModule {}
