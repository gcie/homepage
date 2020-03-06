import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, PermissionGroup } from 'src/app/core/auth';

@Directive({
    selector: '[appAuthKorepetycjeManager]'
})
export class AuthKorepetycjeManagerDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        this.viewContainer.clear();

        if (this.authService.hasPermission(PermissionGroup.korepetycje_manager)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
