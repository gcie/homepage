import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionGroup } from 'src/app/core/models/permission-group.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
    selector: '[appAuthKorepetycjeManager]',
})
export class AuthKorepetycjeManagerDirective {
    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
        this.viewContainer.clear();

        if (this.authService.hasPermission(PermissionGroup.korepetycje_manager)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
