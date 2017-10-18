import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../auth/components/register.component';
import { LoginComponent } from '../auth/components/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  isAuthorized: boolean;
  name: string;
  private router: Router;

  constructor(
    private dialog: MatDialog,
    private auth: AuthService) { }

  openSignUpDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      data:
      {
        action: 'Sign Up',
        name: '',
        password: ''
      }
    });
  }

  openSignInDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data:
      {
        action: 'Sign In',
        name: '',
        password: '',
        signUp: this.dialog
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  signOut(): void {
    this.name = undefined;
    localStorage.setItem('token', 'empty');
    this.auth.checkIfIsAuthorized();
  }

  ngOnInit() {
    this.auth.checkIfIsAuthorized();
  }
}
