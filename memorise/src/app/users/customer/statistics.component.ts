import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit{
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
