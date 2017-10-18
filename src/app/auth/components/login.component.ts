import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../common/services/auth.service';

import { Router } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

declare var jquery:any;
declare var $ :any;
declare var window: any;
declare var FB: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {    
    clicked = false;        
    myForm: FormGroup;    
    
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {    
        this.myForm = this.fb.group({
            'login': new FormControl('', [
                Validators.required,
                Validators.maxLength(18)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ])
        });

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=332333880510904";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        window.fbAsyncInit = () => {
            FB.getLoginStatus(function (response) {
                FB.Event.subscribe('auth.statusChange', (response => {                   
                    if (response.status === 'connected') {
                        let accessToken = response.authResponse.accessToken;                        
                        var url = '/me?fields=name,email';
                        FB.api(url, function (response) {                                                        
                            authService.signUpFacebook({
                                UserName: response.name.split(' ')[0],
                                Email: response.email,
                                Provider: 'Facebook',
                                ExternalAccessToken: accessToken
                            });                                                                          
                        }, { scope: 'email' }) 
                        //window.location.href = 'http://localhost:4200/catalog/courses';                                                                        
                    }
                }));
            });
        }

    }        
    
    LogIn(user): void {
        this.authService.signIn(user)
        .then(() => {
            if (this.authService.validData()) {                                
                this.authService.checkIfIsAuthorized();
                this.router.navigate(['catalog/courses']);                          
            } else {
                this.myForm.controls.login.setValue('');
                this.myForm.controls.password.setValue('');
            }
        });
        this.clicked = true;
    }

    Register(): void {
        this.router.navigate(['register']);
    }

    ngOnInit(): void {  
        if (window.FB) {
            window.FB.XFBML.parse();
        }               
    }    
}


    
