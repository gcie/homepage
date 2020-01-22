import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material/material.module';
import { ConfirmDialogComponent, HeaderComponent, SidenavContentComponent } from './components';
import { ShortenPipe } from './pipes/shorten.pipe';
import { AuthDirective } from './directives/auth.directive';
import { AuthAdminDirective } from './directives/auth-admin.directive';
import { AuthManagerDirective } from './directives/auth-manager.directive';

@NgModule({
    declarations: [
        ShortenPipe,
        ConfirmDialogComponent,
        SidenavContentComponent,
        HeaderComponent,
        AuthDirective,
        AuthAdminDirective,
        AuthManagerDirective
    ],
    imports: [CommonModule, MaterialModule],
    exports: [
        ShortenPipe,
        ConfirmDialogComponent,
        SidenavContentComponent,
        HeaderComponent,
        AuthDirective,
        AuthAdminDirective,
        AuthManagerDirective
    ],
    entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
