import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, PermissionGroup } from 'src/app/core/auth';

@Directive({
    selector: '[appAuthKorepetycjeUser]',
})
export class AuthKorepetycjeUserDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        this.viewContainer.clear();

        console.log('appAuthKorepetycjeUser');
        if (this.authService.hasPermission(PermissionGroup.korepetycje_user)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
