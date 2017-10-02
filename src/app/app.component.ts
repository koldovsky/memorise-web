import { Component } from '@angular/core';

import { User } from './common/models/models';
import { LoginComponent } from './auth/components/login.component';
import {RegisterComponent} from './auth/components/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Memo Rise';
  description = 'Some description';
}
