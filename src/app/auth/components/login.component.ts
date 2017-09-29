import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../common/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    action: string;
    myForm: FormGroup;
    MDdialog: MdDialog;

    constructor(
        public dialogRef: MdDialogRef<LoginComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        public fb: FormBuilder,
        private authService: AuthService

    ) {
        this.action = data.action;
        this.MDdialog = data.signUp;
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
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    LogIn(user): void {
        this.authService.signIn(user);
        this.dialogRef.close(this.myForm.controls['login'].value);
    }

    Register(): void {
        this.MDdialog.open(RegisterComponent, {
            width: '400px',
            data:
            {
                action: 'Sign Up',
                name: '',
                email: '',
                password: ''
            }
        });
        this.dialogRef.close();
    }

    ngOnInit(): void {
       
    }
}

