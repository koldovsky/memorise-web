import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../auth/components/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { User } from '../common/models/models';

// let userCredentials=JSON.parse(localStorage.getItem('user'));

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  private router: Router;

  constructor(private auth: AuthService) { }

  signOut(): void {    
    localStorage.setItem('token', 'empty');
    this.auth.checkIfIsAuthorized();
  }

  ngOnInit() {    
    this.auth.checkIfIsAuthorized();    
    }
  
}
