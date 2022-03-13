import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/model/public.decorator';
import { ROLES_KEY } from 'src/model/role.decorator';
import { Role } from 'src/model/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;

        const authResult = await super.canActivate(context);
        if (!authResult) return false;

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (requiredRoles) {
            const { user } = context.switchToHttp().getRequest();
            return requiredRoles.some((role) => user.roles?.includes(role));
        }

        return true;
    }
}
