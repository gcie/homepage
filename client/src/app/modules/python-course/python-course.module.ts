import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ImageComponent } from './components/image/image.component';
import { PythonCourseHomeComponent } from './pages/python-course-home/python-course-home.page';
import { PythonCourseRoutingModule } from './python-course-routing.module';
import { PythonCourseSidenavMenuComponent } from './components/python-course-sidenav-menu/python-course-sidenav-menu.component';

@NgModule({
    declarations: [PythonCourseHomeComponent, ImageComponent, PythonCourseSidenavMenuComponent],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, PythonCourseRoutingModule],
})
export class PythonCourseModule {}
