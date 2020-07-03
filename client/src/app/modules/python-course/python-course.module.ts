import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { Ex01Component } from './components/exercises/ex01/ex01.component';
import { ImageComponent } from './components/image/image.component';
import { PythonCourseSidenavMenuComponent } from './components/python-course-sidenav-menu/python-course-sidenav-menu.component';
import { PythonExerciseComponent } from './components/python-exercise/python-exercise.component';
import { PythonCourseRoutingModule } from './python-course-routing.module';
import { PythonCourseComponent } from './python-course.component';
import { Chapter01Component } from './views/chapter01/chapter01.component';
import { Lesson01Component } from './views/lesson01/lesson01.component';

@NgModule({
    declarations: [
        PythonCourseComponent,
        ImageComponent,
        PythonCourseSidenavMenuComponent,
        PythonExerciseComponent,
        Ex01Component,
        PythonCourseComponent,
        Lesson01Component,
        Chapter01Component,
    ],
    imports: [CommonModule, SharedModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, PythonCourseRoutingModule],
})
export class PythonCourseModule {}
