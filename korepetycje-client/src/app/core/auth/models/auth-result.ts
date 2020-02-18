import { User } from './user';

export class AuthResult {
    user: User;
    success: boolean;
    token: string;
    expiresIn: string;
}
