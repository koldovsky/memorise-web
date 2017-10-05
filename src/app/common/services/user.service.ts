import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { User, Statistic } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UserService {
    private UsersUrl = 'http://localhost:37271/Catalog/GetUsers';
    private AccountUrl = 'http://localhost:37271/Account/';
    private UserProfile = 'http://localhost:37271/UserProfile/GetUserByLogin';
    constructor(private http: HttpClient) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.UsersUrl)
            .toPromise()
            .then(response => response as User[])
            .catch(handleError);
    }

    getUser(id: number): Promise<User> {
        const URL = `${this.UsersUrl}/${id}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as User)
            .catch(handleError);
    }

    getUserStatisctic(userId: number, courseId: number): Promise<Statistic> {
        const URL = `${this.UsersUrl}/${userId}/courses/${courseId}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Statistic)
            .catch(handleError);
    }

    getUserByLogin(login: string): Promise<User> {
        const URL = `${this.UserProfile}/${login}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as User)
            .catch(handleError);
    }
}
