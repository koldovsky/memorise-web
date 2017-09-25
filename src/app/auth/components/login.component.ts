import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { User } from '../../common/models/models';
import { RegisterComponent } from './register.component';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    action: string;
    signUp: boolean = false;
    myForm: FormGroup;
    email: FormControl;
    password: FormControl;
    MDdialog: MdDialog;   

    constructor(
        public dialogRef: MdDialogRef<LoginComponent>,
        @Inject(MD_DIALOG_DATA) public data: any
    ){
        this.action = data.action;
        this.MDdialog = data.signUp;        
    }

    onNoClick(): void {
        this.dialogRef.close();
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
        this.createFormControls();
        this.createForm();        
    }

    createFormControls(){
        this.email= new FormControl('', [
            Validators.required,
            Validators.pattern(EMAIL_REGEX)
        ]);
        this.password=new FormControl('', [
            Validators.required,
            Validators.minLength(8)            
        ]);
    }

    createForm(){
        this.myForm = new FormGroup({            
            email: this.email,
            password: this.password            
          });
    }
}

