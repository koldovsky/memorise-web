import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/components/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { User } from '../common/models/models';
import { NavigationService } from '../common/services/navigation.service';

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

  constructor(
    private auth: AuthService,
    private navigation: NavigationService,
    private router: Router
  ) { }

  signOut(): void {
    localStorage.setItem('token', 'empty');
    this.auth.checkIfIsAuthorized();
  }

  ngOnInit() {
    this.navigation.category = 'Any';
    this.isAuthorized = this.auth.checkIfIsAuthorized();
    if (this.isAuthorized) {
      this.name = this.auth.getCurrentUserLogin();
    }
  }

  navigateTo(dependency: string): void {
    this.navigation.dependency = dependency;
    this.router.navigate(this.getRouterLink(dependency));
  }

  getRouterLink(dependency: string): string[] {
    return ['catalog', this.navigation.dependency, this.navigation.category];
  }
}
