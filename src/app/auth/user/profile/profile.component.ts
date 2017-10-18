import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/models';
import { AuthService } from '../../../common/services/auth.service';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  constructor(private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  public radioGroupForm: FormGroup;
  user: User;
  name: string;
  login: string;
  email: string;


  preSet():void{
    this.radioGroupForm = this.formBuilder.group({
      'model': 'Male'
    });
  }

  ngOnInit(): void {
    this.preSet();

    this.login = this.authService.getCurrentUserLogin();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService
        .getUserByLogin(this.login))
      .subscribe(user => {
        this.login = user.Login,
          this.email = user.Email,
          this.user = user
      });     
  }
}
