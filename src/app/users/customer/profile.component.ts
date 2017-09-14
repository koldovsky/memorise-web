import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  user = {
    id: 1,
    firstName: 'Nastya',
    lastName: 'Kolomoets',
    login: 'nastya',
    password: '12345',
    photo: null,
    isBlocked: false
  };

  ngOnInit(): void {}
}
