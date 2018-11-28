import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiUrls } from './apiUrls';
import { User } from '../entities/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    endPointUrl: string = ApiUrls.users;

    constructor(private readonly http: HttpClient) { }

    list(): Observable<User[]> {
        return this.http.get<User[]>(this.endPointUrl);
    }
    retrieve(username: string): Observable<User> {
        return this.http.get<User>(this.composeDetailUrl(username));
    }
    update(username: string, user: User): Observable<User> {
        return this.http.patch<User>(this.composeDetailUrl(username), user);
    }
    delete(username: string) {
        return this.http.delete(this.composeDetailUrl(username));
    }
    changePassword(username: string, password: string) {
        const url = this.composeDetailUrl(username) + 'set_password/';
        return this.http.post(url, {'password': password});
    }

    addToGroup(username: string, group: string) {
        const url = this.composeDetailUrl(username) + 'add_group/';
        return this.http.post(url, group);
    }
    removeFromGroup(username: string, group: string) {
        const url = this.composeDetailUrl(username) + 'remove_group/';
        return this.http.post(url, group);
    }
    create(newUser: User) {
        return this.http.post(this.endPointUrl, newUser);
    }
    userExists(username: string): Observable<Boolean> {
        return this.retrieve(username)
            .pipe(
                map(userExist => (userExist ? true : false)),
                catchError(() => of(false))
            );
    }
    private composeDetailUrl(username): string {
        return `${this.endPointUrl}${username}/`;
    }
}
