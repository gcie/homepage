import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOne(email);
        if (!user) return null;
        const result = await promisify(user.comparePassword)(password);
        if (!result) return null;
        return user;
    }
}
