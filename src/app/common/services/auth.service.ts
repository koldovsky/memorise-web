import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User, RegisterExternalBindingModel, Token } from '../models/models';
import { Deck, PageResponse } from '../models/models';
import { handleError } from '../functions/functions';


@Injectable()
export class AuthService {
    valid: boolean;
    errorMessage = '';
    isAuthorized: boolean;    
    user: User;
    userLocal: any;

    private commonUrl = 'http://localhost:37271/';
    private IsValid = true;    

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signIn(user) {
        return this.http.post(this.commonUrl + 'memo/login',
            `username=${user.login}&password=${btoa(user.password)}&grant_type=password`)
            .toPromise()
            .then(response => {
                const token = response as Token;
                localStorage.setItem('token', token.access_token);
                localStorage.setItem('login', user.login);
                localStorage.setItem('id', user.id);                                                
                this.IsValid = true;                
                let expiresDate = this.calcExpirationDate( token.expires_in);
                localStorage.setItem('tokenExpiresDate', expiresDate.toString());                
            })
            .catch(
            error => {
                this.IsValid = false;
                this.errorMessage = 'input, please try again!';
                
            });
    }

    calcExpirationDate(seconds:number):Date {
         const currentDate = new Date();
         currentDate.setSeconds(currentDate.getSeconds()+seconds);
         return currentDate;
    }

    signUp(user) {
        user.password = btoa(user.password);
        return this.http.post(this.commonUrl + 'Account/SignUp', user)
            .toPromise()
            .then(response => {
                this.IsValid = true;
            })
            .catch(handleError => {
                this.IsValid = false;
            });
    }

    signUpFacebook(user) {
        return this.http.post(this.commonUrl + 'Account/RegisterExternal', user)
            .toPromise()
            .then(response => {                
                const token = response as Token;
                localStorage.setItem('token', token.access_token);
                localStorage.setItem('login', token.userName);
                console.log(token.access_token);
                window.location.href = 'http://localhost:4200/catalog/courses/Any';                               
            })
            .catch(handleError => {
                this.errorMessage = 'Failed to access the server!';
            });
    }

    getCurrentUserLogin(): string {        
        if(this.isAuthorized && localStorage.getItem('login')){
            return localStorage.getItem('login');
        }
        return; 
    }

    getCurrentUserId(): string {        
        if(this.isAuthorized && localStorage.getItem('id')){
            return localStorage.getItem('id');
        }
        return; 
    }    

    validData(): boolean {
        return this.IsValid;
    }

    getToken() {
        let currentToken = localStorage.getItem('token');
        if (!currentToken) {
            currentToken = 'empty';
        }
        return currentToken;
    }

    getError() {
        return this.errorMessage;
    }

    setError(message: string) {
        this.errorMessage = message;
    }

    checkIfIsAuthorized(): boolean {
        let currentDate = new Date();
        let expiresDate = new Date(localStorage.getItem('tokenExpiresDate'));
        
        this.isAuthorized = this.getToken() !== 'empty' && currentDate < expiresDate;
        return this.isAuthorized;        
    }
}
