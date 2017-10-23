import { Component, OnInit } from '@angular/core';

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

  constructor(private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.checkIfIsAuthorized();
  }
}

