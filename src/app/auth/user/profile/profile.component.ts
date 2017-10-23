import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/models';
import { AuthService } from '../../../common/services/auth.service';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  constructor(private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.init();
  }

  public radioGroupForm: FormGroup;

  myForm: FormGroup;
  user: User;
  name: string;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  model = false;

  init():void{    
    this.login = this.authService.getCurrentUserLogin();
    this.userService
      .getUserByLogin(this.login)
      .then(response => {
        this.user = response
        this.login = response.Login,
        this.email = response.Email,
        this.firstName = response.FirstName,
        this.lastName = response.LastName,
        this.gender = response.Gender
      }).then(() => {        
        console.log(this.user.Id);
        this.radioGroupForm = this.formBuilder.group({
          'male': '',
          'female': '',
          'other': '',
          'model': 'Male'
        });

        this.myForm = this.fb.group({
          'firstName': this.user.FirstName,
          'lastName': this.user.LastName,
          'gender': this.user.Gender,
          'login': this.user.Login,
          'email': this.user.Email,
          'id': this.user.Id          
        });
      })
  }

  ngOnInit(): void {
    this.init();
    this.radioGroupForm = this.formBuilder.group({
      'model': 1
    });

  }

  updateInfo(): void {
    /* this.user = this.myForm.value;
    console.log(this.myForm.value);
    console.log(this.login); */
    let name = this.myForm.controls['login'].value;    

    this.userService.updateUserByLogin(this.login, this.myForm.value)
      .then(() => localStorage.setItem('login', name))
      .then(() => this.init());
  }
}
