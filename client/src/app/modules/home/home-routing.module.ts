import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards';
import { UserAddDialogComponent } from './components/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { UsersViewComponent } from './views/users-view/users-view.component';

const routes: Routes = [
    { path: '', component: HomeViewComponent },
    { path: 'login', component: LoginViewComponent },
    { path: 'users', component: UsersViewComponent, canActivate: [AdminGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [HomeViewComponent, LoginViewComponent, UsersViewComponent, UserAddDialogComponent, UserEditDialogComponent],
})
export class HomeRoutingModule {}
