import { NgModule, OnInit, Component } from '@angular/core';
import { UserSubscriptionsService } from '../../../common/services/user-subscriptions.service';
import { AuthService } from '../../../common/services/auth.service';
import { Course, Deck } from '../../../common/models/models';
import { handleError } from '../../../common/functions/functions';
import { QuizService } from '../../../common/services/quiz.service';
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
    coursesNeedToRepeat: Course[];
    decksNeedToRepeat: Deck[];
    userLogin: string;
    selector = 'courses';
    styles: {};
    constructor(
      private authService: AuthService,
      private quizService: QuizService,
      private subscribtionsServise: UserSubscriptionsService,
    ) {}
    ngOnInit(): void {
      if (this.authService.isAuthorized) {
          this.userLogin = this.authService.getCurrentUserLogin();

          this.quizService.GetCoursesNeedToRepeat(this.userLogin)
            .then(courses => this.coursesNeedToRepeat = courses)
            .then(() => this.getSubscribedCourses())
            .catch(error => console.log(error));

          this.quizService.GetDecksNeedToRepeat(this.userLogin)
            .then(decks => this.decksNeedToRepeat = decks)
            .catch(error => console.log(error));
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
        this.setDecksNeedToRepeat(deck);
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
        this.setCoursesNeedToRepeat(course);
      });
    },
    err => handleError);
  }

  addMainItemClasses(): string {
    const margin = 'margin ';
    const itemNumber = this.selector === 'courses' ? this.courseNumber : this.deckNumber;
    switch (itemNumber) {
      case 1: return margin + 'col-xs-12 col-sm-12';
      case 2: return margin + 'col-xs-12 col-sm-6';
      case 3: return margin + 'col-xs-12 col-sm-6 col-md-4';
      default: return margin + 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
    }
  }

  setSelector(select: string) {
    if (select.trim().toLowerCase() === 'courses') {
      this.selector = 'courses';
    }if (select.trim().toLowerCase() === 'decks') {
      this.selector = 'decks';
    }
  }

  setCoursesNeedToRepeat(course: Course) {
      this.coursesNeedToRepeat.forEach(courseNTR => {
        if (courseNTR.Id === course.Id) {
          course.IsNeedToRepeat = true;
        }
      });
  }

  setDecksNeedToRepeat(deck: Deck) {
      this.decksNeedToRepeat.forEach(deckNTR => {
        if (deckNTR.Id === deck.Id) {
          deck.IsNeedToRepeat = true;
        }
      });
  }

  // getStylesForCourse(courseId: number) {
  //   let IsCourseNeedToRepeat: boolean;
  //   this.courses.forEach(course => {
  //     if (course.Id === courseId) {
  //       IsCourseNeedToRepeat = course.IsNeedToRepeat;
  //     }
  //   });
  //   if (IsCourseNeedToRepeat) {
  //     this.styles = {
  //       'background-color': 'salmon'
  //     };
  //   }else {
  //       this.styles = {};
  //   }
  //   return this.styles;
  // }

  // getStylesForDeck(deckId: number) {
  //   let IsDeckNeedToRepeat: boolean;
  //   this.decks.forEach(deck => {
  //     if (deck.Id === deckId) {
  //       IsDeckNeedToRepeat = deck.IsNeedToRepeat;
  //     }
  //   });
  //   if (IsDeckNeedToRepeat) {
  //     this.styles = {
  //       'background-color': 'salmon'
  //     };
  //   }else {
  //       this.styles = {}
  //   }
  //   return this.styles;
  // }
}
