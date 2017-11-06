import { Component, OnInit } from '@angular/core';

import { AuthService } from './common/services/auth.service';
import { QuizService } from './common/services/quiz.service';
import { Router, Event, NavigationEnd, RouteConfigLoadStart, RoutesRecognized } from '@angular/router';
import { Card } from './common/models/models';


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
  cardsNeedToRepeat: Card[];

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.checkIfIsAuthorized();
    this.router.events
    .subscribe(() => {
       if (this.authService.checkIfIsAuthorized()) {
         const userId = this.authService.getCurrentUserLogin();
         this.quizService
           .GetCardsNeedToRepeat(userId)
           .then(cards => this.cardsNeedToRepeat = cards);
         if (this.cardsNeedToRepeat !== undefined &&
                  this.cardsNeedToRepeat !== null &&
                  this.cardsNeedToRepeat.length > 0) {
           this.quizService.SetSylesForSubscriptionsDropdownItem(true);
         } else {
           this.quizService.SetSylesForSubscriptionsDropdownItem(false);
         }
       }else {
         this.quizService.SetSylesForSubscriptionsDropdownItem(false);
       }
    });
  }
}

