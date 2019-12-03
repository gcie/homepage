import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersUrl = '/api/users';

    constructor(private http: HttpClient) {}

    getUsers(): Promise<void | User[]> {
        return this.http
            .get(this.usersUrl)
            .toPromise()
            .then((response) => response as User[])
            .catch(this.handleError);
    }

    // post("/api/users")
    createUser(newUser: User): Promise<void | User> {
        return this.http
            .post(this.usersUrl, newUser)
            .toPromise()
            .then((response) => response as User)
            .catch(this.handleError);
    }

    // get("/api/users/:id") endpoint not used by Angular app

    // delete("/api/users/:id")
    deleteUser(delUserId: string): Promise<void | string> {
        return this.http
            .delete(this.usersUrl + '/' + delUserId)
            .toPromise()
            .then((response) => response as string)
            .catch(this.handleError);
    }

    // put("/api/users/:id")
    updateUser(putUser: User): Promise<void | User> {
        const putUrl = this.usersUrl + '/' + putUser._id;
        return this.http
            .put(putUrl, putUser)
            .toPromise()
            .then((response) => response as User)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}
