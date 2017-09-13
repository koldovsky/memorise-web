import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-courses',
  templateUrl: './user-courses.component.html'
})
export class UserCoursesComponent implements OnInit{
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
