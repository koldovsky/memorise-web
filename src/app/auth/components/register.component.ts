import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthService } from '../../common/services/auth.service';
import { passwordMatchValidator } from './password-matcher';
import { FormBuilder } from '@angular/forms';

const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    action: string;
    myForm: FormGroup;
    
    constructor(
        public dialogRef: MdDialogRef<RegisterComponent>,
        private authService: AuthService,
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
        
    }
   
    Register(user):void{ 
    
        this.authService.signUp(user);
        }    
}

