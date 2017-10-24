import { Component, ElementRef, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { QuizService } from '../../common/services/quiz.service';
import { Card, Answer, WordInput, CodeAnswer, Statistics } from '../../common/models/models';
import { QuizComponent } from '../quiz.component';
import { StatisticsService } from '../../common/services/statistics.service';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  cards: Card[];
  wordInputs: WordInput[] = [];
  codeAnswers: CodeAnswer[] = [];
  statistics: Statistics[];

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.cards = this.quizService.cards;
    this.wordInputs = this.quizService.wordInputs;
    this.codeAnswers = this.quizService.codeAnswers;

    this.cards.forEach(c => {
       if (c.CardType.Name === 'Words input') {
         c.RightAnswersText = this.wordInputs[c.Id].RightAnswersText.join('; ');
       } else if (c.CardType.Name === 'Code input') {
        c.RightAnswersText = '';
       } else {
      c.RightAnswersText = '';
      c.Answers.forEach(a => {
        if (a.IsCorrect === true) {
          c.RightAnswersText += a.Text + '; ';
        }
      });
      c.RightAnswersText = c.RightAnswersText.substr(0, c.RightAnswersText.lastIndexOf(';'));
      }
    });
    this.cards.forEach(c => {
      c.CustomerAnswersText = '';
       if (c.CardType.Name === 'Words input') {
         c.CustomerAnswersText = this.wordInputs[c.Id].CustomerAnswerText;
       }else if (c.CardType.Name === 'Code input') {
         c.CustomerAnswersText = this.codeAnswers[c.Id].CodeAnswerText;
       }else {
      c.Answers.forEach(a => {
        if (a.IsChecked === true) {
          c.CustomerAnswersText += a.Text + '; ';
        }
      });
      c.CustomerAnswersText = c.CustomerAnswersText.substr(0, c.CustomerAnswersText.lastIndexOf(';'));
    }
    });
  }

  checkCard(card: Card): string {
     if (card.CardType.Name === 'Words input') {
       if (this.wordInputs[card.Id].IsRight) {
          return 'done';
       }else {
        return 'close';
      }
     }else if (card.CardType.Name === 'Code input') {
       if (this.codeAnswers[card.Id].IsRight) {
         return 'done';
       } else {
         return 'close';
       }
     }else {
    let customerRightAnswersCount = 0;
    let customerAnswersCount = 0;
    let rightAnswersCount = 0;

    card.Answers.forEach(a => {
      if (a.IsChecked) {
        customerAnswersCount++;
        if (a.IsCorrect) {
          customerRightAnswersCount++;
        }
      }
      if (a.IsCorrect) {
        rightAnswersCount++;
      }
    });
    if (customerRightAnswersCount === rightAnswersCount &&
      customerRightAnswersCount === customerAnswersCount) {
      return 'done';
    } else {
      return 'close';
    }
   }
  }
}
