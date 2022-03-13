import { Role } from './role.enum';

export interface User {
    _id?: string;
    name: string;
    email: string;
    roles: Role[];
}

export interface UserRegisterData {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}
