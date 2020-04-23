import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth';

@Directive({
    selector: '[appAuth]',
})
export class AuthDirective {
    private isShown: boolean;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        if (this.authService.isLoggedIn()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.isShown = true;
        } else {
            this.viewContainer.clear();
            this.isShown = false;
        }
    }

    @Input() set appAuth(condition: boolean) {
        if (condition === this.authService.isLoggedIn() && !this.isShown) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.isShown = true;
        } else if (condition !== this.authService.isLoggedIn() && this.isShown) {
            this.viewContainer.clear();
            this.isShown = false;
        }
    }
}
