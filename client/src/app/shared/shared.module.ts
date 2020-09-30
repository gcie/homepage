import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { ConfirmDialogComponent } from './components';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { EditableListItemComponent } from './components/editable-list-item/editable-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { MultiselectCheckboxWithOptionComponent } from './components/multiselect-checkbox-with-option/multiselect-checkbox-with-option.component';
import { MultiselectCheckboxComponent } from './components/multiselect-checkbox/multiselect-checkbox.component';
import { NoopCheckboxComponent } from './components/noop-checkbox/noop-checkbox.component';
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
        MultiselectCheckboxComponent,
        NoopCheckboxComponent,
        MultiselectCheckboxWithOptionComponent,
    ],
    imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
    exports: [
        ShortenPipe,
        ConfirmDialogComponent,
        EditableListItemComponent,
        SelectableListItemComponent,
        HeaderComponent,
        CodeEditorComponent,
        MultiselectCheckboxComponent,
        MultiselectCheckboxWithOptionComponent,
        AuthAdminDirective,
        AuthKorepetycjeManagerDirective,
        AuthKorepetycjeUserDirective,
        AuthDirective,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
