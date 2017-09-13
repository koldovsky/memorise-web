import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'security',
  templateUrl: './security.component.html'
})
export class SecurityComponent implements OnInit{
  customer = {
    id: 1,
    firstName: 'Nastya',
    lastName: 'Kolomoets',
    login: 'nastya',
    password: '12345',
    photo: null,
    isBlocked: false
  }

  ngOnInit(): void {}
}
