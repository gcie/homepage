import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material/material.module';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthAdminDirective } from './directives/auth-admin.directive';
import { AuthKorepetycjeManagerDirective } from './directives/auth-korepetycje-manager.directive';
import { AuthKorepetycjeUserDirective } from './directives/auth-korepetycje-user.directive';
import { AuthDirective } from './directives/auth.directive';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
    declarations: [
        ShortenPipe,
        ConfirmDialogComponent,
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
        HeaderComponent,
        CodeEditorComponent,
        AuthAdminDirective,
        AuthKorepetycjeManagerDirective,
        AuthKorepetycjeUserDirective,
        AuthDirective,
    ]
})
export class SharedModule {}
