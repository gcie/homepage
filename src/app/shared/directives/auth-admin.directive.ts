import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/auth';

@Directive({
    selector: '[appAuthAdmin]'
})
export class AuthAdminDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        this.viewContainer.clear();

        if (this.authService.isAdmin()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
