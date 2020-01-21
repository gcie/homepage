import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material/material.module';
import { ConfirmDialogComponent, HeaderComponent, SidenavContentComponent } from './components';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
    declarations: [ShortenPipe, ConfirmDialogComponent, SidenavContentComponent, HeaderComponent],
    imports: [CommonModule, MaterialModule],
    exports: [ShortenPipe, ConfirmDialogComponent, SidenavContentComponent, HeaderComponent],
    entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
