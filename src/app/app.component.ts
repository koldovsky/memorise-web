import { Component, OnInit } from '@angular/core';

import { AuthService } from './common/services/auth.service';
import { QuizService } from './common/services/quiz.service';
import { Router, Event, NavigationEnd, RouteConfigLoadStart, RoutesRecognized } from '@angular/router';
import { Deck, Course } from './common/models/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Memo Rise';
  description = 'Some description';
  name: string;
  event: Event;
  decksNeedToRepeat: Deck[];
  coursesNeedToRepeat: Course[];

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.events
    .subscribe((e) => {
      if (this.authService.isAuthorized) {
        if (e instanceof NavigationEnd) {
         const userLogin = this.authService.getCurrentUserLogin();
          this.quizService
            .GetDecksNeedToRepeat(userLogin)
            .then(decks => this.decksNeedToRepeat = decks)
            .catch(error => console.log(error));
            this.quizService
            .GetCoursesNeedToRepeat(userLogin)
            .then(courses => this.coursesNeedToRepeat = courses)
            .catch(error => console.log(error));
         if (this.decksNeedToRepeat && this.decksNeedToRepeat.length > 0 ||
              this.coursesNeedToRepeat && this.coursesNeedToRepeat.length > 0) {
           this.quizService.SetSylesForSubscriptionsDropdownItem(true);
         } else {
           this.quizService.SetSylesForSubscriptionsDropdownItem(false);
         }
       }else {
         this.quizService.SetSylesForSubscriptionsDropdownItem(false);
       }
      }
    });
  }
}
