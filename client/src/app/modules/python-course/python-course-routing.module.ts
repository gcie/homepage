import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PythonCourseHomeComponent } from './pages/python-course-home/python-course-home.page';

const routes: Routes = [{ path: '', component: PythonCourseHomeComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    entryComponents: [PythonCourseHomeComponent],
})
export class PythonCourseRoutingModule {}
