import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/model/public.decorator';
import { Roles } from 'src/model/role.decorator';
import { Role } from 'src/model/role.enum';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

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
    async register(@Body() body) {
        return this.usersService.create(body.email, body.password);
    }
}
