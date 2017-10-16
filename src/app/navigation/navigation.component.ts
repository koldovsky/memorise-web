import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../auth/components/register.component';
import { LoginComponent } from '../auth/components/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { User } from '../common/models/models';

//let userCredentials=JSON.parse(localStorage.getItem('user'));

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
   

  constructor(private dialog: MatDialog,
    private auth: AuthService) {
      /* this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.currentUser){      
      console.log(this.currentUser.Login);     
      } else{
        console.log('sth wrong');
      }            */     
      
     }

     getlogin(name){
       this.name = name;
     }

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
