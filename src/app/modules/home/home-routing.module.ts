import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent, UsersPageComponent } from './pages';
import { AdminGuard } from 'src/app/core/guards';
import {
    UserAddDialogComponent,
    UserEditDialogComponent,
    PupilAddDialogComponent,
    PupilEditDialogComponent,
    TutorAddDialogComponent,
    TutorEditDialogComponent
} from './components';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'users', component: UsersPageComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [
        HomePageComponent,
        UsersPageComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
        PupilAddDialogComponent,
        PupilEditDialogComponent,
        TutorAddDialogComponent,
        TutorEditDialogComponent
    ]
})
export class HomeRoutingModule {}
