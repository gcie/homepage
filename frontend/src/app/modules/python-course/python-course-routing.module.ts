import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PythonCourseComponent } from './python-course.component';
import { Chapter01Component } from './views/chapter01/chapter01.component';
import { GymExerciseMobileComponent } from './views/gym-exercise-mobile/gym-exercise-mobile.component';
import { GymExerciseMobileResolver } from './views/gym-exercise-mobile/gym-exercise-mobile.resolver';
import { GymMobileComponent } from './views/gym-mobile/gym-mobile.component';
import { Lesson01Component } from './views/lesson01/lesson01.component';

const routes: Routes = [
    { path: '', redirectTo: 'chapter-01', pathMatch: 'full' },
    {
        path: '',
        component: PythonCourseComponent,
        children: [
            { path: 'chapter-01', component: Chapter01Component },
            { path: 'lesson-01', component: Lesson01Component },
        ],
    },
    { path: 'gym', component: GymMobileComponent },
    { path: 'gym/:id', component: GymExerciseMobileComponent, resolve: { exercise: GymExerciseMobileResolver } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PythonCourseRoutingModule {}
