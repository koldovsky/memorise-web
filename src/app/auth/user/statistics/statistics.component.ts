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
  passedPercent: string;
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
  isLoaded = false;

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
        this.dependency = 'Course';
        this.subscriptionName = null;
        this.setNamesInfo();
        this.setStatisticsInfo();
      });
  }

  calculateSuccessPercent(statistics: Statistics[]): string {
    let passed = 0;
    let successful = 0;
    statistics.forEach(s => {
      if (s && s.CardStatus !== 0) {
        passed++;
        if (s.CardStatus === 2) {
          successful++;
        }
      }
    });

    return (passed === 0 ? 0 : successful * 100 / passed).toFixed(0);
  }

  calculatePassedPercent(statistics: Statistics[]): string {
    const total = statistics.length;
    let passed = 0;
    statistics.forEach(s => {
      if (s && s.CardStatus !== 0) {
        passed++;
      }
    });

    return (passed === 0 ? 0 : passed * 100 / total).toFixed(0);
  }

  setStatisticsInfo(): void {
    this.statisticsInfo = [];

    if (this.dependency === 'Course') {
      this.subscribtionsServise
        .getSubscribedCourses(this.userLogin)
        .subscribe(
        courses => {
          courses = courses.sort((c1, c2) => c1.Name.localeCompare(c2.Name));
          this.setCoursesStatisticsInfo(courses);
        },
        err => handleError);
    } else {
      this.subscribtionsServise
        .getSubscribedDecks(this.userLogin)
        .subscribe(
        decks => {
          decks = decks.sort((d1, d2) => d1.Name.localeCompare(d2.Name));
          this.setDecksStatisticsInfo(decks);
        },
        err => handleError);
    }
  }

  setCoursesStatisticsInfo(courses: Course[]) {
    courses.forEach(course => {
      if (this.subscriptionName === null || course.Name === this.subscriptionName) {
        const deckStatisticsInfo: StatisticsInfo[] = [];

        course.Decks.forEach(deck => {
          this.statisticsService
            .getStatisticsByUserAndDeck(this.userLogin, deck.Id)
            .subscribe(statistics => {
              if (statistics) {
                deckStatisticsInfo.push({
                  name: deck.Name,
                  passedPercent: this.calculatePassedPercent(statistics),
                  successPercent: this.calculateSuccessPercent(statistics),
                });
              }
            });
        });

        this.statisticsService
          .getStatisticsByUserAndCourse(this.userLogin, course.Id)
          .subscribe(statistics => {
            this.statisticsInfo.push({
              name: course.Name,
              passedPercent: this.calculatePassedPercent(statistics),
              successPercent: this.calculateSuccessPercent(statistics),
              containInfo: deckStatisticsInfo
            });
          });
      }
    });
  }

  setDecksStatisticsInfo(decks: Deck[]) {
    decks.forEach(deck => {
      if (this.subscriptionName === null || deck.Name === this.subscriptionName) {
        this.statisticsService
          .getStatisticsByUserAndDeck(this.userLogin, deck.Id)
          .subscribe(statistics => {
            if (statistics) {
              this.statisticsInfo.push({
                name: deck.Name,
                passedPercent: this.calculatePassedPercent(statistics),
                successPercent: this.calculateSuccessPercent(statistics)
              });
            }
          });
      }
    });
  }

  setNamesInfo(): void {
    this.subscriptionsNames = [];
    this.subscriptionName = null;
    this.isLoaded = false;

    if (this.dependency === 'Course') {
      this.subscribtionsServise
        .getSubscribedCourses(this.userLogin)
        .subscribe(courses => {
          courses.forEach(course => this.subscriptionsNames.push(course.Name));
          this.subscriptionsNames.sort();
          this.isLoaded = true;
        });
    } else {
      this.subscribtionsServise
        .getSubscribedDecks(this.userLogin)
        .subscribe(decks => {
          decks.forEach(deck => this.subscriptionsNames.push(deck.Name));
          this.subscriptionsNames.sort();
          this.isLoaded = true;
        });
    }
  }
}
