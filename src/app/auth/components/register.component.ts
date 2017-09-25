import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { User } from '../../common/models/models';

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

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', [
        Validators.minLength(8),
        Validators.required
    ]);   

    constructor(
        public dialogRef: MdDialogRef<RegisterComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {            
        this.action = data.action;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }    

    ngOnInit(): void {
        this.createFormControls();
        this.createForm(); 
    }
    createFormControls(){
        this.login = new FormControl('', [
            Validators.required            
        ]);
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
            login: this.login,           
            email: this.email,
            password: this.password            
          });
    }
}

