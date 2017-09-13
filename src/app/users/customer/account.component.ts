import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit{
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
