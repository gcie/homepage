import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './pages';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, LoginRoutingModule]
})
export class LoginModule {}
