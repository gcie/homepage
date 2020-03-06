import { PermissionGroup } from './permission-group.enum';

export class User {
    _id?: string;
    name: string;
    email: string;
    group: PermissionGroup;
}

export class UserRegisterData {
    name: string;
    email: string;
    password: string;
}

export class UserLoginData {
    email: string;
    password: string;
}
