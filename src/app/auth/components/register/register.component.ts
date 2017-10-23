import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../../common/services/auth.service';
import { passwordMatchValidator } from './password-matcher';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {    
    clicked = false;
    regex = regexExpression;      
    myForm: FormGroup;

    constructor(        
        private authService: AuthService,
        private router: Router,
        public fb: FormBuilder        
        ) {        
        this.myForm = this.fb.group({
            'login': new FormControl('', [
                Validators.required,
                Validators.maxLength(20)
            ]),
            'email': new FormControl('', [
                Validators.required,
                Validators.pattern(EMAIL_REGEX)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            'passwordConfirm': new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                passwordMatchValidator('password')
            ])
        });
    }    

    ngOnInit(): void {
    }

    Register(user): void {
        this.authService.signUp(user)
            .then(() => {
                if (this.authService.validData()) {
                    this.router.navigate(['login']);
                } else {                    
                    this.myForm.reset();
                }
            });
        this.clicked = true;
    }
}
