import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../../common/models/models';
import { UserService } from '../../common/services/user.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    action: string;
    myForm: FormGroup;
    email: FormControl;
    password: FormControl;
    login: FormControl;
    user: User

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', [
        Validators.minLength(8),
        Validators.required
    ]);

    constructor(
        public dialogRef: MatDialogRef<RegisterComponent>,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.action = data.action;
        this.user = { Login: "non" } as User;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.createFormControls();
        this.createForm();
    }
    createFormControls() {
        this.login = new FormControl('', [
            Validators.required
        ]);
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern(EMAIL_REGEX)
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(8)
        ]);
    }

    createForm() {
        this.myForm = new FormGroup({
            login: this.login,
            email: this.email,
            password: this.password
        });
    }
    Register(): void {
        this.user.Login = this.login.value;
        this.user.Email = this.email.value;
        this.user.Password = this.password.value;
        console.log(this.user);
        this.userService.registerUser(this.user);
    }
}

