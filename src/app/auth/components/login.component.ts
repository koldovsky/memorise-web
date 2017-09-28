import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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
    signUp: boolean = false;
    myForm: FormGroup;
    //email: FormControl;
    login: FormControl;    
    password: FormControl;
    MDdialog: MdDialog; 
    user: User;
    name:string;   

    constructor(
        public dialogRef: MdDialogRef<LoginComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private userService: UserService
        
    ){
        this.action = data.action;
        this.MDdialog = data.signUp; 
        this.user={Login:""} as User;       
    }

    onNoClick(): void {
        this.dialogRef.close({name: this.name});
    }
    LogIn():void{ 
        this.user.Login=this.login.value;
        this.user.Password=this.password.value;
        console.log(this.user);
        this.userService.loginUser(this.user);
        this.dialogRef.close(this.login.value);
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
        this.login= new FormControl('', [
            Validators.required,
            //Validators.pattern(EMAIL_REGEX)
        ]);
        this.password=new FormControl('', [
            Validators.required,
            Validators.minLength(6)            
        ]);
    }

    createForm(){
        this.myForm = new FormGroup({            
            email: this.login,
            password: this.password            
          });
    }
}

