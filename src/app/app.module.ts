import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MaterialModule } from './material/material.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PupilAddDialogComponent } from './pupils/pupil-add-dialog/pupil-add-dialog.component';
import { PupilsListComponent } from './pupils/pupils-list/pupils-list.component';
import { SidenavContentComponent } from './shared/sidenav-content/sidenav-content.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersPageComponent } from './users/users-page/users-page.component';
import { UserDeleteConfirmDialogComponent } from './users/user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { UserAddDialogComponent } from './users/user-add-dialog/user-add-dialog.component';
import { UserEditDialogComponent } from './users/user-edit-dialog/user-edit-dialog.component';
import { PupilDeleteConfirmDialogComponent } from './pupils/pupil-delete-confirm-dialog/pupil-delete-confirm-dialog.component';
import { PupilEditDialogComponent } from './pupils/pupil-edit-dialog/pupil-edit-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        PupilsListComponent,
        PupilAddDialogComponent,
        LoginPageComponent,
        MainPageComponent,
        RegisterPageComponent,
        UsersPageComponent,
        UsersListComponent,
        ToolbarComponent,
        SidenavContentComponent,
        UserDeleteConfirmDialogComponent,
        UserAddDialogComponent,
        UserEditDialogComponent,
        PupilDeleteConfirmDialogComponent,
        PupilEditDialogComponent
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    }
}
