import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { User, Token } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class AuthService {
    private commonUrl = 'http://localhost:37271/';
    constructor(private http: HttpClient) {
    }

    signIn(user) {

        return this.http.post(this.commonUrl + "memo/login",
            `username=${user.login}&password=${btoa(user.password)}&grant_type=password`)
            .toPromise()
            .then(response => {
                let token = response as Token;
                localStorage.setItem("token", token.access_token);
            })
            .catch(handleError)
    }
    signUp(user) {
        user.password= btoa(user.password);
        return this.http.post(this.commonUrl + "Account/SignUp", user)
            .toPromise()
            .then(response => {
                var us = response;
                console.log(response);
                //alert("You are registered with login: "+us.Login);
            })
            .catch(handleError);
    }
    getToken() {
        let currentToken=localStorage.getItem("token");
        if(!currentToken){
            currentToken="empty";
        }
        return currentToken;
    }
}
