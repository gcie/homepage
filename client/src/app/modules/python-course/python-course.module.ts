import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ImageComponent } from './components/image/image.component';
import { PythonCourseSidenavMenuComponent } from './components/python-course-sidenav-menu/python-course-sidenav-menu.component';
import { PythonCourseRoutingModule } from './python-course-routing.module';
import { PythonCourseHomeComponent } from './views/python-course-home/python-course-home.component';
import { PythonExerciseComponent } from './components/python-exercise/python-exercise.component';

@NgModule({
    declarations: [PythonCourseHomeComponent, ImageComponent, PythonCourseSidenavMenuComponent, PythonExerciseComponent],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, PythonCourseRoutingModule],
})
export class PythonCourseModule {}
