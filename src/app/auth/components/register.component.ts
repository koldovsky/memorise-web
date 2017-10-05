import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../common/services/auth.service';
import { passwordMatchValidator } from './password-matcher';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    action: string;
    clicked = false;
    message: 'Congratulation, you successfully registered!';
    snackBar: MatSnackBar;
    myForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<RegisterComponent>,
        private authService: AuthService,
        public fb: FormBuilder,
        // public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any) {
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
    }

    Register(user): void {
        this.authService.signUp(user)
            .then(() => {
                if (this.authService.validData()) {
                    this.dialogRef.close();
                    // this.snackBar.open(this.message, this.action, {
                    // duration: 2000,
                    // });
                } else {
                    this.myForm.controls.login.setValue('');
                    this.myForm.controls.email.setValue('');
                    this.myForm.controls.password.setValue('');
                    this.myForm.controls.passwordConfirm.setValue('');
                }
            });
        this.clicked = true;
    }
}
