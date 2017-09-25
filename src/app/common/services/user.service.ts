import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User, Statistic } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UserService {
    private UsersUrl = 'http://localhost:37271/Catalog/GetUsers';
    private AccountUrl='http://localhost:37271/Account/';

    constructor(private http: Http) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.UsersUrl)
            .toPromise()
            .then(response => response.json() as User[])
            .catch(handleError);
    }

    getUser(id: number): Promise<User> {
        const URL = `${this.UsersUrl}/${id}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response.json() as User)
            .catch(handleError);
    }

    getUserStatisctic(userId: number, courseId: number): Promise<Statistic> {
        const URL = `${this.UsersUrl}/${userId}/courses/${courseId}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response.json() as Statistic)
            .catch(handleError);
    }
    loginUser(user:User){
     
                return this.http.post(this.AccountUrl+"SignIn",user)
                    .toPromise()
                    .then(response =>{
                        var us=response.json() as User;
                        alert("Hello "+us.Login);
                    } )
                    .catch(handleError);
    }
    registerUser(user:User){
        
                   return this.http.post(this.AccountUrl+"SignUp",user)
                       .toPromise()
                       .then(response =>{
                           var us=response.json() as User;
                           alert("You are registered with login: "+us.Login);
                       } )
                       .catch(handleError);
       }
}
