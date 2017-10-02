import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';


import { User, Token } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class AuthService {
    errorMessage = "";

    private commonUrl = 'http://localhost:37271/';
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    private valid: boolean = true;
    signIn(user) {

        return this.http.post(this.commonUrl + "memo/login",
            `username=${user.login}&password=${btoa(user.password)}&grant_type=password`)
            .toPromise()
            .then(response => {
                let token = response as Token;
                localStorage.setItem("token", token.access_token);
                this.valid = true;
            })
            .catch(
            error => {
                this.valid = false;
                this.errorMessage = "Invalid login or password";
                //this.router.navigate(['/unauthorized']);
            })
    }
    signUp(user) {
        user.password = btoa(user.password);
        return this.http.post(this.commonUrl + "Account/SignUp", user)
            .toPromise()
            .then(response => {
                var response = response;
                this.valid = true;
                //console.log(response);
            })
            .catch(handleError=>{
                this.valid = false;
            })

    }
    validData(): boolean {
        return this.valid;
    }
    getToken() {
        let currentToken = localStorage.getItem("token");
        if (!currentToken) {
            currentToken = "empty";
        }
        return currentToken;
    }
    getError() {
        return this.errorMessage;
    }
    setError(message: string) {
        this.errorMessage = message;
    }
}
