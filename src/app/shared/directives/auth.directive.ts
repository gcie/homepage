import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/auth';

@Directive({
    selector: '[appAuth]'
})
export class AuthDirective {
    private expression: string;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {}

    @Input() set appAuth(expression: string) {
        this.expression = expression;

        this.updateView();
    }

    private updateView(): void {
        this.viewContainer.clear();

        if (this.validateExpression(this.expression)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

    private validateExpression(expression: string): boolean {
        const validateFunction = new Function('admin', 'manager', `return (${expression});`);
        return validateFunction(this.authService.isAdmin(), this.authService.isManager());
    }
}
