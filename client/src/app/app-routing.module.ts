import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorepetycjeUserGuard } from './core/guards';

const routes: Routes = [
    { path: '', loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule) },
    {
        path: 'korepetycje',
        loadChildren: () => import('src/app/modules/korepetycje/korepetycje.module').then((m) => m.KorepetycjeModule),
        canActivate: [KorepetycjeUserGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    entryComponents: []
})
export class AppRoutingModule {}
