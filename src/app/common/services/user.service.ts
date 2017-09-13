import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User, Statistic } from '../models/models';
import { handleError } from '../functions/functions';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private UsersUrl = 'http://localhost:37271/Catalog/GetUsers';
    constructor(private http: Http) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.UsersUrl)
            .toPromise()
            .then(response => response.json() as User[])
            .catch(handleError);
    }

    getUser(id: number): Promise<User> {
        const url = `${this.UsersUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as User)
            .catch(handleError);
    }

    getUserStatisctic(userId: number, courseId: number): Promise<Statistic> {
        const url = `${this.UsersUrl}/${userId}/courses/${courseId}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Statistic)
            .catch(handleError);
    }
}
