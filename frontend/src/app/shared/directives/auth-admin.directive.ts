import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from 'src/app/core/models/role.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
    selector: '[appAuthAdmin]',
})
export class AuthAdminDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        this.viewContainer.clear();

        if (this.authService.hasRole(Role.Admin)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
