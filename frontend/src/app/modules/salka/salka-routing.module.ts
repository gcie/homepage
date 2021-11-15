import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KorepetycjeUserGuard } from 'src/app/core/guards';
import { HomePageComponent } from './pages/home/home.page';

const routes: Routes = [{ path: '', component: HomePageComponent, canActivate: [KorepetycjeUserGuard] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: []
})
export class SalkaRoutingModule {}
