import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { User, Statistics, Course, Deck } from '../../../common/models/models';
import { UserService } from '../../../common/services/user.service';
import { UserSubscriptionsService } from '../../../common/services/user-subscriptions.service';
import { StatisticsService } from '../../../common/services/statistics.service';
import { DeckService } from '../../../common/services/deck.service';
import { handleError } from '../../../common/functions/functions';

class StatisticsInfo {
  name: string;
  successPercent: string;
  containInfo?: StatisticsInfo[];
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  userLogin: string;
  dependency: string;
  subscriptionsNames: string[] = [];
  subscriptionName: string;

  statisticsInfo: StatisticsInfo[] = [];

  constructor(
    private userService: UserService,
    private subscribtionsServise: UserSubscriptionsService,
    private statisticsService: StatisticsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService
        .getUserByLogin(params.get('name')))
      .subscribe(user => {
        this.userLogin = user.Login;
        this.dependency = 'Deck';
        this.subscriptionName = null;
        this.setNamesInfo();
        this.setSuccessPercent();
      });
  }

  calculateSuccessPercent(statistics: Statistics[]): string {
    let passed = 0;
    let successful = 0;
    statistics.forEach(s => {
      if (s.CardStatus !== 0) {
        passed++;
        if (s.CardStatus === 2) {
          successful++;
        }
      }
    });

    return (passed === 0 ? 0 : successful * 100 / passed).toFixed(0);
  }

  setSuccessPercent(): void {
    this.statisticsInfo = [];
    if (this.dependency === 'Course') {
      this.subscribtionsServise
        .getSubscribedCourses(this.userLogin)
        .subscribe(
        courses => this.setCoursesSuccessPercent(courses),
        err => handleError);
    } else {
      this.subscribtionsServise
        .getSubscribedDecks(this.userLogin)
        .subscribe(
        decks => this.setDecksSuccessPercent(decks),
        err => handleError);
    }
  }

  // getDeckStatisticsInfo(decks: Deck[]): Observable<StatisticsInfo[]> {
  //   const statisticsInfo: StatisticsInfo[] = [];
  //   decks.forEach(deck => this.statisticsService
  //     .getStatisticsByUserAndDeck(this.userLogin, deck.Id)
  //     .map(statistics => {
  //       statisticsInfo.push({
  //         name: deck.Name,
  //         successPercent: this.calculateSuccessPercent(statistics)
  //       });
  //     }));

  //   return Observable.of(statisticsInfo);
  // }

  setCoursesSuccessPercent(courses: Course[]) {
    courses.forEach(course => {
      if (this.subscriptionName === null || course.Name === this.subscriptionName) {
        this.addCourseSuccessPercent(course);
      }
    });
  }

  setDecksSuccessPercent(decks: Deck[]) {
    decks.forEach(deck => {
      if (this.subscriptionName === null || deck.Name === this.subscriptionName) {
        this.addDeckSuccessPercent(deck);
      }
    });
  }

  addCourseSuccessPercent(course: Course): void {
    this.statisticsService
      .getStatisticsByUserAndCourse(this.userLogin, course.Id)
      .subscribe(statistics => {
        this.statisticsInfo.push({
          name: course.Name,
          successPercent: this.calculateSuccessPercent(statistics),
        });
      });

    // const deckStatisticsInfo: StatisticsInfo[] = [];
    // course.Decks.forEach(deck => {
    //   this.statisticsService
    //     .getStatisticsByUserAndDeck(this.userLogin, deck.Id)
    //     .subscribe(stats => {
    //       deckStatisticsInfo.push({
    //         name: deck.Name,
    //         successPercent: this.calculateSuccessPercent(stats)
    //       });
    //       statistics.concat(stats);
    //     });
    // });
  }

  addDeckSuccessPercent(deck: Deck): void {
    this.statisticsService
      .getStatisticsByUserAndDeck(this.userLogin, deck.Id)
      .subscribe(statistics => {
        this.statisticsInfo.push({
          name: deck.Name,
          successPercent: this.calculateSuccessPercent(statistics)
        });
      });
  }

  setNamesInfo(): void {
    this.subscriptionsNames = [];
    this.subscriptionName = null;

    if (this.dependency === 'Course') {
      this.subscribtionsServise
        .getSubscribedCourses(this.userLogin)
        .subscribe(courses => {
          courses.forEach(course => this.subscriptionsNames.push(course.Name));
        });
    } else {
      this.subscribtionsServise
        .getSubscribedDecks(this.userLogin)
        .subscribe(decks => {
          decks.forEach(deck => this.subscriptionsNames.push(deck.Name));
        });
    }
  }

  resetStatistics(): void {
    this.setNamesInfo();
    this.setSuccessPercent();
  }
}
