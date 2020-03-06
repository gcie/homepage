import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.page';
import { LoginPageComponent } from './pages/login/login.page';
import { AuthGuard } from 'src/app/core/guards';

const routes: Routes = [
    { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [HomePageComponent, LoginPageComponent]
})
export class HomeRoutingModule {}
