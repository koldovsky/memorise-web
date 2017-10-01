import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    template: `
  <h1 align="center">Access denied! You need to SignIn.</h1>
  <div align="center">
    <button md-raised-button (click)="goHome()">Home</button>
  </div>
  `
})

export class UnauthorizedComponent {
    constructor(
        private location: Location,
        private router: Router
    ) { }

    goHome(): void {
        this.router.navigate(['/home']);
    }

    
}
