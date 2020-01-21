import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages';

const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [LoginPageComponent]
})
export class LoginRoutingModule {}
