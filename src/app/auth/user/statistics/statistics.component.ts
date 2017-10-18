import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { User, Statistics, Course, Deck } from '../../../common/models/models';
import { UserService } from '../../../common/services/user.service';
import { UserSubscriptionsService } from '../../../common/services/user-subscriptions.service';
import { StatisticsService } from '../../../common/services/statistics.service';
import { DeckService } from '../../../common/services/deck.service';

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
  namesInfo: string[] = [];
  nameInfo: string;

  statisticsInfo: StatisticsInfo[] = [];

  constructor(
    private userService: UserService,
    private subscribtionsServise: UserSubscriptionsService,
    private statisticsService: StatisticsService,
    private route: ActivatedRoute,
    // Just to see that it works
    private deckService: DeckService
  ) {  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService
        .getUserByLogin(params.get('name')))
      .subscribe(user => {
        this.userLogin = user.Login;
      });

    this.dependency = 'Deck';

    // Just to see that it works
    this.deckService.getDecks().then(d => {
      d.forEach(deck => {
        this.namesInfo.push(deck.Name);
        this.addDeckSuccessPercent(deck);
      });
    });

    // //What really should be
    // this.setNamesInfo();
    // this.setSuccessPercent();
  }

  // getUserDecks(): Deck[] {
  //   // this.subscribtionsServise.getUserDecks(this.userLogin)
  //   //   .then(d => decks = d);
  //   let decks = [];
  //   let isLoaded = false;
  //   this.deckService.getDecks().then(d => {
  //     decks = d;
  //     isLoaded = true;
  //   });
  //   while (true) {
  //     isLoaded ? break : continue;
  //   }

  //   return decks;
  // }

  // getUserCourses(): Course[] {
  //   let courses;
  //   this.subscribtionsServise.getUserCourses(this.userLogin)
  //     .then(c => courses = c);

  //   return courses;
  // }

  // getCourseStatistics(courseId: number): Statistics[] {
  //   let courseStatistics;
  //   this.statisticsService
  //     .getStatisticsByUserAndCourse(this.userLogin, courseId)
  //     .then(s => {
  //       courseStatistics = s;
  //     });

  //   return courseStatistics;
  // }

  // getDeckStatistics(deckId: number): void {
  //   let deckStatistics;
  //   this.statisticsService
  //     .getStatisticsByUserAndDeck(this.userLogin, deckId)
  //     .then(s => {
  //       deckStatistics = s;
  //     });

  //   return deckStatistics;
  // }

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
        .getUserCourses(this.userLogin)
        .then(courses => {
          courses.forEach(course => {
            if (this.nameInfo === null || course.Name === this.nameInfo) {
              this.addCourseSuccessPercent(course);
            }
          });
        });

    } else {
      this.subscribtionsServise
        .getUserDecks(this.userLogin)
        .then(decks => {
          decks.forEach(deck => {
            if (this.nameInfo === null || deck.Name === this.nameInfo) {
              this.addDeckSuccessPercent(deck);
            }
          });
        });
    }
  }

  addCourseSuccessPercent(course: Course): void {
    const statistics: Statistics[] = [];
    const deckStatisticsInfo: StatisticsInfo[] = [];

    course.Decks.forEach(deck => {
      this.statisticsService
        .getStatisticsByUserAndDeck(this.userLogin, deck.Id)
        .then(stats => {
          deckStatisticsInfo.push({
            name: deck.Name,
            successPercent: this.calculateSuccessPercent(stats)
          });
          statistics.concat(stats);
        });
    });

    this.statisticsInfo.push({
      name: course.Name,
      successPercent: this.calculateSuccessPercent(statistics),
      containInfo: deckStatisticsInfo
    });
  }

  addDeckSuccessPercent(deck: Deck): void {
    this.statisticsService
      .getStatisticsByUserAndDeck(this.userLogin, deck.Id)
      .then(statistics => {
        this.statisticsInfo.push({
          name: deck.Name,
          successPercent: this.calculateSuccessPercent(statistics)
        });
      });
  }

  setNamesInfo(): void {
    this.namesInfo = [];
    if (this.dependency === 'Course') {
      this.subscribtionsServise
        .getUserCourses(this.userLogin)
        .then(courses => {
          courses.forEach(course => this.namesInfo.push(course.Name));
        });
    } else {
      this.subscribtionsServise
      .getUserDecks(this.userLogin)
      .then(decks => {
        decks.forEach(deck => this.namesInfo.push(deck.Name));
      });
    }
  }
}
