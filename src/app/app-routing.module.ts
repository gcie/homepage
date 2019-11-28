import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PupilAddDialogComponent } from './pupils/pupil-add-dialog/pupil-add-dialog.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    entryComponents: [PupilAddDialogComponent]
})
export class AppRoutingModule {}
