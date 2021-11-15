import { PermissionGroup } from './permission-group.enum';

export interface User {
    _id?: string;
    name: string;
    email: string;
    groups: PermissionGroup[];
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
