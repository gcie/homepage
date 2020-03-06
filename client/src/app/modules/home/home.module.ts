import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home.page';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login/login.page';

@NgModule({
    declarations: [HomePageComponent, LoginPageComponent],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, HomeRoutingModule]
})
export class HomeModule {}
