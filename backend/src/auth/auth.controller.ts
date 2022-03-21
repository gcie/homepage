import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/model/public.decorator';
import { Roles } from 'src/model/role.decorator';
import { Role } from 'src/model/role.enum';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ operationId: 'login' })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Roles(Role.Admin)
    @Post('register')
    @ApiOperation({ operationId: 'register' })
    async register(@Request() req) {
        // TODO
    }
}
