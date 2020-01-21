import { User } from './user/user';

export class AuthResult {
    user: User;
    success: boolean;
    token: string;
    expiresIn: string;
}
