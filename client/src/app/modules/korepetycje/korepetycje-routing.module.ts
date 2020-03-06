import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, KorepetycjeUserGuard } from 'src/app/core/guards';
import {
    PupilAddDialogComponent,
    PupilEditDialogComponent,
    TutorAddDialogComponent,
    TutorEditDialogComponent,
    UserAddDialogComponent,
    UserEditDialogComponent
} from './components';
import { HomePageComponent, UsersPageComponent } from './pages';

const routes: Routes = [
    { path: '', component: HomePageComponent, canActivate: [KorepetycjeUserGuard] },
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
export class KorepetycjeRoutingModule {}
