import { Component, OnInit } from '@angular/core';

import { User } from './common/models/models';
import { LoginComponent } from './auth/components/login.component';
import { RegisterComponent } from './auth/components/register.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Memo Rise';
  description = 'Some description';
  name: string;

  constructor(private dialog: MatDialog,
              private authService: AuthService
  ) { }

  ngOnInit(){
    this.authService.checkIfIsAuthorized();
  }
}

