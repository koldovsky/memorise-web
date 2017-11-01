import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/models';
import { AuthService } from '../../../common/services/auth.service';
import { errorMessages } from './../../../common/helpers/errorMessages';
import { regexExpression } from './../../../common/helpers/regexExpression';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  radioGroupForm: FormGroup;
  profileForm: FormGroup;
  user: User;
  name: string;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  model = '';
  regex: any;
  message: any;

  constructor(private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  reset(): void {
    this.login = this.authService.getCurrentUserLogin();
    this.userService
      .getUserByLogin(this.login)
      .then(response => {
        this.user = response,
          this.login = response.Login,
          this.email = response.Email,
          this.firstName = response.FirstName,
          this.lastName = response.LastName,
          this.gender = response.Gender,
          this.model = response.Gender;
      }).then(() => {
        this.profileForm = this.fb.group({
          'firstName': this.user.FirstName,
          'lastName': this.user.LastName,
          'gender': this.user.Gender,
          'login': this.user.Login,
          'email': new FormControl(this.user.Email, [
            Validators.pattern(this.regex.EMAIL_REGEX)
          ]),
          'id': this.user.Id
        });
      });
  }

  ngOnInit(): void {
    this.regex = regexExpression;
    this.message = errorMessages;
    this.reset();
  }

  updateInfo(): void {
    this.profileForm.controls['gender'].setValue(this.model);
    const name = this.profileForm.controls['login'].value;

    this.userService.updateUserByLogin(this.login, this.profileForm.value)
      .then(() => localStorage.setItem('login', name))
      .then(() => this.reset());
  }

  revertInfo(): void {
    this.reset();
  }

}
