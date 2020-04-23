import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PythonCourseHomeComponent } from './pages/python-course-home/python-course-home.page';
import { PythonCourseRoutingModule } from './python-course-routing.module';
import { ImageComponent } from './components/image/image.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [PythonCourseHomeComponent, ImageComponent, HeaderComponent],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, PythonCourseRoutingModule],
})
export class PythonCourseModule {}
