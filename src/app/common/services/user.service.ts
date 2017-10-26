import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { User, Statistics } from '../models/models';
import { handleError } from '../functions/functions';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

    private UserProfile = 'http://localhost:37271/UserProfile';
    constructor(private http: HttpClient) { }

    getUsers(): Promise<User[]> {
        return this.http.get(`${environment.catalogUrl}/GetUsers`)
            .toPromise()
            .then(response => response as User[])
            .catch(handleError);
    }

    getUserById(id: string): Promise<User> {
        const URL = `${environment.userProfileUrl}/GetUserById/${id}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as User)
            .catch(handleError);
    }

    getUserByLogin(login: string): Promise<User> {
        const URL = `${environment.userProfileUrl}/GetUserByLogin/${login}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as User)
            .catch(handleError);
    }

    updateUserById(user: User) {
        const URL = `${environment.userProfileUrl}/UpdateUserById`;
        return this.http.put(URL, user);
    }

    updateUserProfileById(user: User) {
        const URL = `${environment.userProfileUrl}/UpdateUserProfileById`;
        return this.http.put(URL, user);
    }

    updateUserByLogin(login: string, user: User) {
        const URL = `${environment.userProfileUrl}/UpdateUserByLogin`;
        return this.http.put(URL, { ExistingLogin: login, NewUserData: user }).toPromise();
    }
}
