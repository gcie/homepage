import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../modules/material/material.module';
import { AdminGuard, KorepetycjeManagerGuard, KorepetycjeUserGuard, AuthGuard } from './guards';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    imports: [HttpClientModule, CommonModule, MaterialModule],
    providers: [
        AuthGuard,
        KorepetycjeUserGuard,
        KorepetycjeManagerGuard,
        AdminGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import this module in the AppModule only.`);
        }
    }
}
