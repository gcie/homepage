import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { KorepetycjeModule } from './modules/korepetycje/korepetycje.module';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        MaterialModule,
        KorepetycjeModule,
        HomeModule,
        FormsModule,
        SharedModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    }
}
