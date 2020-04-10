import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.page';
import { LoginPageComponent } from './pages/login/login.page';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [HomePageComponent, LoginPageComponent]
})
export class HomeRoutingModule {}
