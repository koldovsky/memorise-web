import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { User } from './common/models/models';
import { LoginComponent } from './auth/components/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Memo Rise';
  description = 'Some description';

  constructor(private dialog: MdDialog) { }

  openSignUpDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
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
      width: '250px',
      data:
      {
        action: 'Sign In',
        name: '',
        password: ''
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.user = JSON.parse(result) as User;
    // });
  }
}
