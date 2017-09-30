import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { RegisterComponent } from '../auth/components/register.component';
import { LoginComponent } from '../auth/components/login.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

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

    // dialogRef.afterClosed().subscribe(result => {
    //   this.user = JSON.parse(result) as User;
    // });
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

    // dialogRef.afterClosed().subscribe(result => {
    //   this.user = JSON.parse(result) as User;
    // });
  }

  ngOnInit() {
  }

}
