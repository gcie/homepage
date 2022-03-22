import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';

const routes: Routes = [
    { path: '', loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule) },
    {
        path: 'python',
        loadChildren: () => import('src/app/modules/python-course/python-course.module').then((m) => m.PythonCourseModule),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
