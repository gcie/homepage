import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then((m) => m.LoginModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    entryComponents: []
})
export class AppRoutingModule {}
