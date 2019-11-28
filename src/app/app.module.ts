import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PupilAddDialogComponent } from './pupils/pupil-add-dialog/pupil-add-dialog.component';
import { PupilsListComponent } from './pupils/pupils-list/pupils-list.component';

@NgModule({
    declarations: [AppComponent, PupilsListComponent, PupilAddDialogComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    }
}
