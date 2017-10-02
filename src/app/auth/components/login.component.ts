import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../../common/models/models';
import { RegisterComponent } from './register.component';
import { UserService } from '../../common/services/user.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    action: string;
    signUp = false;
    myForm: FormGroup;
    // email: FormControl;
    login: FormControl;
    password: FormControl;
    Matdialog: MatDialog;
    user: User;

    constructor(
        public dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService

    ) {
        this.action = data.action;
        this.Matdialog = data.signUp;
        this.user = { Login: 'non' } as User;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    LogIn(): void {
        this.user.Login = this.login.value;
        this.user.Password = this.password.value;
        console.log(this.user);
        this.userService.loginUser(this.user);
    }

    Register(): void {
        this.Matdialog.open(RegisterComponent, {
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
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.login = new FormControl('', [
            Validators.required,
            // Validators.pattern(EMAIL_REGEX)
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]);
    }

    createForm() {
        this.myForm = new FormGroup({
            email: this.login,
            password: this.password
        });
    }
}

