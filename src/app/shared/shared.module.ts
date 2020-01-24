import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { ConfirmDialogComponent, HeaderComponent, SidenavMenuComponent } from './components';
import { EditableListItemComponent } from './components/editable-list-item/editable-list-item.component';
import { AuthAdminDirective } from './directives/auth-admin.directive';
import { AuthManagerDirective } from './directives/auth-manager.directive';
import { AuthDirective } from './directives/auth.directive';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
    declarations: [
        ShortenPipe,
        ConfirmDialogComponent,
        SidenavMenuComponent,
        HeaderComponent,
        EditableListItemComponent,
        AuthDirective,
        AuthAdminDirective,
        AuthManagerDirective
    ],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports: [
        ShortenPipe,
        ConfirmDialogComponent,
        SidenavMenuComponent,
        HeaderComponent,
        EditableListItemComponent,
        AuthDirective,
        AuthAdminDirective,
        AuthManagerDirective
    ],
    entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
