import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../../../common/services/auth.service';
import { passwordMatchValidator } from './password-matcher';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from './../../../common/helpers/errorMessages';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    clicked = false;
    regex: any;
    registerForm: FormGroup;
    message: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        public fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.regex = regexExpression;
        this.message = errorMessages;
        this.registerForm = this.fb.group({
            'login': new FormControl('', [
                Validators.required,
                Validators.maxLength(this.regex.MAX_LENGTH_INPUT)
            ]),
            'email': new FormControl('', [
                Validators.required,
                Validators.pattern(this.regex.EMAIL_REGEX)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(this.regex.MIN_LENGTH_PASSWORD)
            ]),
            'passwordConfirm': new FormControl('', [
                Validators.required,
                Validators.minLength(this.regex.MIN_LENGTH_PASSWORD),
                passwordMatchValidator('password')
            ])
        });
    }

    Register(user): void {
        this.authService.signUp(user)
            .then(() => {
                if (this.authService.validData()) {
                    this.showSnackbar();
                    this.registerForm.reset();
                } else {
                    this.registerForm.reset();
                }
            });
        this.clicked = true;
    }

    showSnackbar() {
        const x = document.getElementById('snackbar');
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }
}
