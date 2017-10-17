import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  step = 0;
  user: User;
  name: string;
  login: string;
  email: string;
  private sub: any;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setValueLogin() { this.login = 'user'; }
  setValueEmail() { this.email = 'user@gmail.com'; }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService
        .getUserByLogin(params.get('name')))
      .subscribe(user => {
        this.login = user.Login,
          this.email = user.Email;
      });
  }
}
