import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User, RegisterExternalBindingModel, Token } from '../models/models';
import { Deck, PageResponse } from '../models/models';
import { handleError } from '../functions/functions';
import { environment } from '../../../environments/environment';
import { errorMessages } from './../helpers/errorMessages';


@Injectable()
export class AuthService {
    valid: boolean;
    errorMessage = '';
    isAuthorized: boolean;
    user: User;
    userLocal: any;
    message: any;

    private IsValid = true;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.message = errorMessages;
     }

    signIn(user) {
        return this.http.post(environment.loginUrl,
            `username=${user.login}&password=${btoa(user.password)}&grant_type=password`)
            .toPromise()
            .then(response => {
                const token = response as Token;
                localStorage.setItem('token', token.access_token);
                localStorage.setItem('login', user.login);
                localStorage.setItem('id', user.id);
                this.IsValid = true;
                const expiresDate = this.calcExpirationDate(token.expires_in);
                localStorage.setItem('tokenExpiresDate', expiresDate.toString());
            })
            .catch(
            error => {
                this.IsValid = false;
                this.errorMessage = this.message.INCORRECT_LOGIN_INPUT;

            });
    }

    calcExpirationDate(seconds: number): Date {
        const currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + seconds);
        return currentDate;
    }

    signUp(user) {
        user.password = btoa(user.password);
        return this.http.post(`${environment.accountUrl}/SignUp`, user)
            .toPromise()
            .then(response => {
                this.IsValid = true;
            })
            .catch(handleError => {
                this.IsValid = false;
            });
    }

    signUpFacebook(user) {
        return this.http.post(`${environment.accountUrl}/RegisterExternal`, user)
            .toPromise()
            .then(response => {
                const token = response as Token;
                localStorage.setItem('token', token.access_token);
                localStorage.setItem('login', token.userName);
                window.location.href =  `${environment.coursesRedirectUrl}`;
            })
            .catch(handleError => {
                this.errorMessage = 'Failed to access the server!';
            });
    }

    getCurrentUserLogin(): string {
        if (this.isAuthorized && localStorage.getItem('login')) {
            return localStorage.getItem('login');
        }
        return;
    }

    getCurrentUserId(): string {
        if (this.isAuthorized && localStorage.getItem('id')) {
            return localStorage.getItem('id');
        }
        return;
    }

    validData(): boolean {
        return this.IsValid;
    }

    getToken() {
        return localStorage.getItem('token') || 'empty';
    }

    getError() {
        return this.errorMessage;
    }

    setError(message: string) {
        this.errorMessage = message;
    }

    checkIfIsAuthorized(): boolean {
        const currentDate = new Date();
        const expiresDate = new Date(localStorage.getItem('tokenExpiresDate'));

        this.isAuthorized = this.getToken() !== 'empty' && currentDate < expiresDate;
        return this.isAuthorized;
    }
}
