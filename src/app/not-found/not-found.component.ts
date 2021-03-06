import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
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
