import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ConfirmDialogComponent } from './components';
import { EditableListItemComponent } from './components/editable-list-item/editable-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectableListItemComponent } from './components/selectable-list-item/selectable-list-item.component';
import { AuthAdminDirective } from './directives/auth-admin.directive';
import { AuthKorepetycjeManagerDirective } from './directives/auth-korepetycje-manager.directive';
import { AuthKorepetycjeUserDirective } from './directives/auth-korepetycje-user.directive';
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
        AuthKorepetycjeUserDirective,
        AuthDirective,
        HeaderComponent,
        CodeEditorComponent,
    ],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
    exports: [
        ShortenPipe,
        ConfirmDialogComponent,
        EditableListItemComponent,
        SelectableListItemComponent,
        HeaderComponent,
        CodeEditorComponent,
        AuthAdminDirective,
        AuthKorepetycjeManagerDirective,
        AuthKorepetycjeUserDirective,
        AuthDirective,
    ],
    entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
