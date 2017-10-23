import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { LoginComponent } from '../auth/components/login.component';
import { AuthService } from '../common/services/auth.service';
import { User } from '../common/models/models';

// let userCredentials=JSON.parse(localStorage.getItem('user'));

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  isAuthorized: boolean;
  name: string;
  currentUser: User;
  private router: Router;

  constructor(private auth: AuthService) { }

  signOut(): void {
    this.name = undefined;
    localStorage.setItem('token', 'empty');
    this.auth.checkIfIsAuthorized();
  }

  ngOnInit() {
    this.isAuthorized = this.auth.checkIfIsAuthorized();
    if (this.isAuthorized) {
      this.name = this.auth.getCurrentUserLogin();
      console.log(this.name);
    }
  }
}
