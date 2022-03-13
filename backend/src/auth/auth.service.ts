import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXPIRATION_TIME } from 'src/app.constants';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOne(email);
        if (!user) return null;
        const result = await promisify(user.comparePassword.bind(user))(password);
        if (!result) return null;
        user.password = undefined;
        return user;
    }

    async login(user: any) {
        const payload = { _id: user._id, email: user.email, name: user.name, roles: user.roles };
        return { token: this.jwtService.sign(payload), user: payload, success: true, expiresIn: JWT_EXPIRATION_TIME };
    }
}
