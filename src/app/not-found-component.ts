import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    template: `
  <h1 align="center">Page not found</h1>
  <div align="center">
    <button md-raised-button (click)="goBack()">Go Back</button>
    <button md-raised-button (click)="goHome()">Home</button>
  </div>
  `
})

export class PageNotFoundComponent {
    constructor(
        private location: Location,
        private router: Router
    ) { }

    goHome(): void {
        this.router.navigate(['/home']);
    }

    goBack(): void {
        this.location.back();
    }
}
