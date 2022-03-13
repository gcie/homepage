import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from 'src/app/core/models/role.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
    selector: '[appAuthKorepetycjeUser]',
})
export class AuthKorepetycjeUserDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        this.viewContainer.clear();

        console.log('appAuthKorepetycjeUser');
        if (this.authService.hasRole(Role.korepetycje_user)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
