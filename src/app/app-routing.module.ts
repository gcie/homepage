import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';

const routes: Routes = [
    { path: '', loadChildren: 'src/app/modules/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: 'src/app/modules/login/login.module#LoginModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    entryComponents: []
})
export class AppRoutingModule {}
