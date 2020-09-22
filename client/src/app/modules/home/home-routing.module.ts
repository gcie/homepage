import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, AuthGuard } from 'src/app/core/guards';
import { UserAddDialogComponent } from './components/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { HomeComponent } from './home.component';
import { AdminConsoleViewComponent } from './views/admin-console-view/admin-console-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { UserViewComponent } from './views/user-view/user-view.component';
import { UsersViewComponent } from './views/users-view/users-view.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: HomeViewComponent },
            { path: 'login', component: LoginViewComponent },
            { path: 'users', component: UsersViewComponent, canActivate: [AdminGuard] },
            { path: 'user', component: UserViewComponent, canActivate: [AuthGuard] },
            { path: 'admin-console', component: AdminConsoleViewComponent, canActivate: [AuthGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [
        HomeViewComponent,
        LoginViewComponent,
        UsersViewComponent,
        UserViewComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
    ],
})
export class HomeRoutingModule {}
