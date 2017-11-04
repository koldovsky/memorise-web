import { NgModule, OnInit, Component } from '@angular/core';
import { UserSubscriptionsService } from '../../../common/services/user-subscriptions.service';
import { AuthService } from '../../../common/services/auth.service';
import { Course, Deck } from '../../../common/models/models';
import { handleError } from '../../../common/functions/functions';
declare let $: any;

@Component({
    selector: 'app-subscriptions',
    templateUrl: './subscriptions.component.html',
    styleUrls: ['./subscriptions.component.css']
  })
  export class SubscriptionsComponent implements OnInit {

    deckNumber: number;
    courseNumber: number;
    courses: Course[];
    decks: Deck[];
    userLogin: string;
    selector = 'courses';
    constructor(
      private authService: AuthService,
      private subscribtionsServise: UserSubscriptionsService,
    ) {}
    ngOnInit(): void {
      this.userLogin = this.authService.getCurrentUserLogin();
      if (this.selector === 'courses') {
        this.getSubscribedCourses();
      } else {
        this.getSubscribedDecks();
    }
  }

  getSubscribedDecks() {
    this.subscribtionsServise
    .getSubscribedDecks(this.userLogin)
    .subscribe(decks => {
      this.decks = decks;
      this.deckNumber = this.decks.length;
      this.decks.forEach(deck => {
        deck.IsSubscribed = true;
      });
    },
    err => handleError);
  }

  getSubscribedCourses() {
    this.subscribtionsServise
    .getSubscribedCourses(this.userLogin)
    .subscribe(courses => {
      this.courses = courses;
      this.courseNumber = this.courses.length;
      this.courses.forEach(course => {
        course.IsSubscribed = true;
      });
    },
    err => handleError);
  }

  addColClasses(): string {
    const itemNumber = this.selector === 'courses' ? this.courseNumber : this.deckNumber;
    switch (itemNumber) {
      case 1: return 'col-xs-12 col-sm-12';
      case 2: return 'col-xs-12 col-sm-6';
      case 3: return 'col-xs-12 col-sm-6 col-md-4';
      default: return 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
    }
  }

  setSelector(select: string) {
    if (select.trim().toLowerCase() === 'courses') {
      this.selector = 'courses';
    }if (select.trim().toLowerCase() === 'decks') {
      this.selector = 'decks';
    }
  }

  // addStylesForClassCard(): {} {
  //     let styles: object;
  //     const itemNumber = this.selector === 'courses' ? this.courseNumber : this.deckNumber;
  //     const itemId = this.selector === 'courses' ? 'courseId' : 'deckId';
  //     switch (itemNumber) {
  //       case 1:
  //         if ($(itemId).hasClass('col-md-4') && $(itemId).hasClass('col-lg-3')) {
  //           styles = {
  //             'width': '20rem',
  //           };
  //         } else if ($(itemId).hasClass('col-md-4')) {
  //           styles = {
  //             'width': '17rem',
  //           };
  //         } else {
  //           styles = {
  //             'width': '40rem',
  //           };
  //         } break;
  //       case 2:
  //         if ($(itemId).hasClass('col-md-4') && $(itemId).hasClass('col-lg-3')) {
  //           styles = {
  //             'width': '20rem',
  //           };
  //         } else if ($(itemId).hasClass('col-md-4')) {
  //           styles = {
  //             'width': '17rem',
  //           };
  //         } else {
  //           styles = {
  //             'width': '40rem',
  //           };
  //         } break;
  //       case 3:
  //         if ($(itemId).hasClass('col-md-4') && $(itemId).hasClass('col-lg-3')) {
  //           styles = {
  //             'width': '20rem',
  //           };
  //         } else if ($(itemId).hasClass('col-md-4')) {
  //           styles = {
  //             'width': '17rem',
  //           };
  //         } else {
  //           styles = {
  //             'width': '40rem',
  //           };
  //         } break;
  //       default:
  //         if ($(itemId).hasClass('col-md-4') && $(itemId).hasClass('col-lg-3')) {
  //           styles = {
  //             'width': '20rem',
  //           };
  //         } else if ($(itemId).hasClass('col-md-4')) {
  //           styles = {
  //             'width': '17rem',
  //           };
  //         } else {
  //           styles = {
  //             'width': '40rem',
  //           };
  //         } break;
  //     }
  //     return styles;
  // }
}
