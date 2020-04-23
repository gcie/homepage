import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { ConfirmDialogComponent } from './components';
import { EditableListItemComponent } from './components/editable-list-item/editable-list-item.component';
import { SelectableListItemComponent } from './components/selectable-list-item/selectable-list-item.component';
import { AuthAdminDirective } from './directives/auth-admin.directive';
import { AuthKorepetycjeManagerDirective } from './directives/auth-korepetycje-manager.directive';
import { AuthDirective } from './directives/auth.directive';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
    declarations: [
        ShortenPipe,
        ConfirmDialogComponent,
        EditableListItemComponent,
        SelectableListItemComponent,
        AuthAdminDirective,
        AuthKorepetycjeManagerDirective,
        AuthDirective,
    ],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
    exports: [
        ShortenPipe,
        ConfirmDialogComponent,
        EditableListItemComponent,
        SelectableListItemComponent,
        AuthAdminDirective,
        AuthKorepetycjeManagerDirective,
        AuthDirective,
    ],
    entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
