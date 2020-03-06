import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/auth';

@Directive({
    selector: '[appAuthManager]'
})
export class AuthManagerDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        this.viewContainer.clear();

        if (this.authService.isManager()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
