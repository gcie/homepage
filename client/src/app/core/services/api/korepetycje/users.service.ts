import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersUrl = '/api/korepetycje/users';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

    // post("/api/users")
    createUser(newUser: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, newUser);
    }

    // get("/api/users/:id") endpoint not used by Angular app

    // delete("/api/users/:id")
    deleteUser(delUserId?: string): Observable<string> {
        return this.http.delete<string>(this.usersUrl + '/' + delUserId);
    }

    // put("/api/users/:id")
    updateUser(putUser: User): Observable<User> {
        const putUrl = this.usersUrl + '/' + putUser._id;
        return this.http.put<User>(putUrl, putUser);
    }
}
