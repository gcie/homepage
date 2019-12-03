export class User {
    _id?: string;
    name: string;
    surname: string;
    email: string;
    group: 'user' | 'admin';
}
