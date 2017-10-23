import { Component, ElementRef, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { QuizService } from '../../common/services/quiz.service';
import { Card, Answer } from '../../common/models/models';
import { QuizComponent } from '../quiz.component';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  cards: Card[];

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.cards = this.quizService.cards;
    this.cards.forEach(c => {
      c.RightAnswersText = '';
      c.Answers.forEach(a => {
        if (a.IsCorrect === true) {
          c.RightAnswersText += a.Text + '; ';
        }
      });
      c.RightAnswersText = c.RightAnswersText.substr(0, c.RightAnswersText.lastIndexOf(';'))
    });
    this.cards.forEach(c => {
      c.CustomerAnswersText = '';
      c.Answers.forEach(a => {
        if (a.IsChecked === true) {
          c.CustomerAnswersText += a.Text + '; ';
        }
      });
      c.CustomerAnswersText = c.CustomerAnswersText.substr(0, c.CustomerAnswersText.lastIndexOf(';'))
    });
  }

  checkCard(card: Card): string {
    let result;
    let customerRightAnswersCount = 0;
    let rightAnswersCount = 0;

    card.Answers.forEach(a => {
      if (a.IsChecked && a.IsCorrect) {
        customerRightAnswersCount++;
      }
      if (a.IsCorrect) {
        rightAnswersCount++;
      }
    });
    if (customerRightAnswersCount === rightAnswersCount) {
      return 'Right';
    } else {
      return 'Wrong';
    }
  }
}
