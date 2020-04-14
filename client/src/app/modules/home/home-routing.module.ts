import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards';
import { UserAddDialogComponent } from './components/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { HomePageComponent } from './pages/home/home.page';
import { LoginPageComponent } from './pages/login/login.page';
import { UsersPageComponent } from './pages/users/users.page';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'users', component: UsersPageComponent, canActivate: [AdminGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [HomePageComponent, LoginPageComponent, UsersPageComponent, UserAddDialogComponent, UserEditDialogComponent],
})
export class HomeRoutingModule {}
