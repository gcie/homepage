import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PythonCourseComponent } from './python-course.component';
import { Chapter01Component } from './views/chapter01/chapter01.component';

const routes: Routes = [
    { path: '', redirectTo: 'chapter-01', pathMatch: 'full' },
    { path: '', component: PythonCourseComponent, children: [{ path: 'chapter-01', component: Chapter01Component }] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [PythonCourseComponent],
})
export class PythonCourseRoutingModule {}
