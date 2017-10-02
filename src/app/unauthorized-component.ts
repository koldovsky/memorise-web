import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './common/services/auth.service';

@Component({
    template: 
  `
  <img style="margin-left:35%" src="../assets/images/membersOnly.jpg" />
  <h1 align="center">{{message}}</h1>
  <div align="center">
  <a mat-raised-button (click)="goHome()">Home</a>
  </div>
  `,
  styleUrls: ['./not-found/not-found.component.css']
})

export class UnauthorizedComponent implements OnInit {
    
    message:string;
        
    constructor(
        private auth: AuthService,
        private location: Location,
        private router: Router
    ) { }

    goHome(): void {
        this.router.navigate(['/home']);
    }
    ngOnInit(): void {
       this.message=this.auth.getError();
    }

    
}
