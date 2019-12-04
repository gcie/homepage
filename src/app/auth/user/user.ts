import { PermissionGroup } from './permission-group.enum';

export class User {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    group: PermissionGroup;
}
