import { User } from './user';

export interface AuthResult {
    user: User;
    success: boolean;
    token: string;
    expiresIn: string;
}
