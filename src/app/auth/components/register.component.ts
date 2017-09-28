import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../common/models/models';
import { UserService } from '../../common/services/user.service';
import { passwordMatchValidator } from './password-matcher';
import { FormBuilder } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    action: string;
    myForm: FormGroup;
    //email: FormControl;
    //password: FormControl;
    //passwordConfirm: FormControl;
    //login: FormControl;
    //user: User;

    constructor(
        public dialogRef: MdDialogRef<RegisterComponent>,
        private userService: UserService,
        public fb: FormBuilder,
        @Inject(MD_DIALOG_DATA) public data: any) {
        this.action = data.action;
        this.myForm = this.fb.group({
            'login': new FormControl('', [
                Validators.required,
                Validators.maxLength(18)
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

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        /* this.user = {
            Login: '',
            Email: '',
            Password: ''
        } as User; */
        //this.createFormControls();
        //this.createForm();
    }
    /* createFormControls() {
        this.login = new FormControl('', [
            Validators.required
        ]);
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern(EMAIL_REGEX)
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(4)            
        ]);
        this.passwordConfirm = new FormControl('', [
            Validators.required,
            passwordMatchValidator('password')
        ]);
    }

    createForm() {
        this.myForm = this.fb.group({
            login: this.login,
            email: this.email,
            password: this.password,
            passwordConfirm: this.password
        }, {
                Validator: passwordMatchValidator('password')
            });
    } */
    Register(): void {
        //this.user.Login = this.login.value;
        //this.user.Email = this.email.value;
        //this.user.Password = this.password.value;
        //console.log(this.user);
        this.userService.registerUser({
            Login: this.myForm.controls['login'].value,
            Email: this.myForm.controls['email'].value,
            Password: this.myForm.controls['password'].value,
        });
    }
}

