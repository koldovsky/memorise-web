import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../common/services/auth.service';

import { Router } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';

declare var window: any;
declare var FB: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    clicked = false;
    regex: any;
    message: any;
    loginForm: FormGroup;

    constructor(
        public fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
    ) {
        this.regex = regexExpression;
        this.message = errorMessages;

        this.loginForm = this.fb.group({
            'login': new FormControl('', [
                Validators.required,
                Validators.maxLength(this.regex.MAX_LENGTH_INPUT)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(this.regex.MIN_LENGTH_PASSWORD)
            ])
        });

        (function (d, s, id) {
            // tslint:disable-next-line:prefer-const
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=332333880510904';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        window.fbAsyncInit = () => {
            FB.getLoginStatus(function (response) {
                FB.Event.subscribe('auth.statusChange', (respon => {
                    if (respon.status === 'connected') {
                        const accessToken = respon.authResponse.accessToken;
                        const url = '/me?fields=name,email';
                        FB.api(url, function (resp) {
                            authService.signUpFacebook({
                                UserName: resp.name.split(' ')[0],
                                Email: resp.email,
                                Provider: 'Facebook',
                                ExternalAccessToken: accessToken
                            });
                        },
                            { scope: 'email' });
                    }
                }));
            });
        };

    }

    LogIn(user): void {
        this.authService.signIn(user)
            .then(() => {
                if (this.authService.validData()) {
                    this.authService.checkIfIsAuthorized();
                    this.router.navigate(['catalog/courses/Any']);
                } else {
                    this.loginForm.reset();
                }
            });
        this.clicked = true;
    }

    Register(): void {
        this.router.navigate(['register']);
    }

    signOut(): void {
        FB.logout();
    }

    ngOnInit(): void {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }
}
