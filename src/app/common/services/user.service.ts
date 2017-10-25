import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { User, Statistics } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UserService {
    private UsersUrl = 'http://localhost:37271/Catalog/GetUsers';
    private AccountUrl = 'http://localhost:37271/Account/';
    private UserProfile = 'http://localhost:37271/UserProfile';
    constructor(private http: HttpClient) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.UsersUrl)
            .toPromise()
            .then(response => response as User[])
            .catch(handleError);
    }

    getUserById(id: string): Promise<User> {
        const URL = `${this.UserProfile}/GetUserById/${id}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as User)
            .catch(handleError);
    }

    getUserByLogin(login: string): Promise<User> {
        const URL = `${this.UserProfile}/GetUserByLogin/${login}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as User)
            .catch(handleError);
    }

    updateUserById(user: User) {
        const URL = `${this.UserProfile}/UpdateUserById`;
        return this.http.put(URL, user);
    }

    updateUserProfileById(user: User) {
        const URL = `${this.UserProfile}/UpdateUserProfileById`;
        return this.http.put(URL, user);
    }

    updateUserByLogin(login: string, user: User) {
        const URL = `${this.UserProfile}/UpdateUserByLogin`;
        return this.http.put(URL, { ExistingLogin: login, NewUserData: user }).toPromise();
    }
}
