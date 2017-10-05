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
  }

  checkAnswer(answer: Answer): string {
    let result = answer.Text;
    if (answer.IsChecked && answer.IsCorrect) {
      result += ', IS RIGHT';
      return result;
    } else if (answer.IsChecked && !answer.IsCorrect) {
      result += ', IS WRONG';
      return result;
    }
    return '';
  }
}
