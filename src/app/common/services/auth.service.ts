import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User, Token, Deck, PageResponse } from '../models/models';
import { handleError } from '../functions/functions';


@Injectable()
export class AuthService {
    valid: boolean;
    errorMessage = '';
    isAuthorized: boolean;
    
       
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
                let expiresDate = this.calcExpirationDate( token.expires_in);
                localStorage.setItem('tokenExpiresDate', expiresDate.toString());
                this.IsValid = true;
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
                this.valid = true;
            })
            .catch(handleError => {
                this.IsValid = false;
            });
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

    checkIfIsAuthorized(): void {
        let currentDate = new Date();
        let expiresDate = new Date(localStorage.getItem('tokenExpiresDate'));
        
        if (this.getToken() !== 'empty' && currentDate < expiresDate) {
            this.isAuthorized = true;
        } else {
            this.isAuthorized = false;
        }
    }
}
