import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../common/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    action: string;
    clicked = false;
    myForm: FormGroup;
    Matdialog: MatDialog;

    constructor(
        public dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public fb: FormBuilder,
        private authService: AuthService
    ) {
        this.action = data.action;
        this.Matdialog = data.signUp;
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
        this.authService.signIn(user)
            .then(() => {
                if (this.authService.validData()) {
                    this.dialogRef.close(this.myForm.controls['login'].value);
                    this.authService.checkIfIsAuthorized();
                } else {
                    this.myForm.controls.login.setValue('');
                    this.myForm.controls.password.setValue('');
                }
            });
        this.clicked = true;
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
    }
}
