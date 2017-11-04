import { Component, ElementRef, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { QuizService } from '../../common/services/quiz.service';
import { Card, Answer, WordInput, CodeAnswer, Statistics } from '../../common/models/models';
import { QuizComponent } from '../quiz.component';
import { StatisticsService } from '../../common/services/statistics.service';
import { AuthService } from '../../common/services/auth.service';
import { handleError } from '../../common/functions/functions';

const CARD_STATUS = {
  NOT_PASSED: 0,
  INCORRECT: -1,
  CORRECT: 1
};

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  cards: Card[];
  wordInputs: WordInput[] = [];
  codeAnswers: CodeAnswer[] = [];

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService,
    private authService: AuthService
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
      } else if (c.CardType.Name === 'Code input') {
        c.CustomerAnswersText = this.codeAnswers[c.Id].CodeAnswerText;
      } else {
        c.Answers.forEach(a => {
          if (a.IsChecked === true) {
            c.CustomerAnswersText += a.Text + '; ';
          }
        });
        c.CustomerAnswersText = c.CustomerAnswersText.substr(0, c.CustomerAnswersText.lastIndexOf(';'));
      }
      this.saveStatistics(c);
    });
  }

  getIcon(card: Card): string {
    return this.checkCard(card) ? 'done' : 'close';
  }

  checkCard(card: Card): boolean {
    const isAnswerCorrect = card.CardType.Name === 'Words input'
      ? this.checkWordInput(card)
      : card.CardType.Name === 'Code input'
        ? this.checkCodeInput(card)
        : this.checkTestInput(card);

    return isAnswerCorrect;
  }

  checkWordInput(card: Card): boolean {
    return this.wordInputs[card.Id].IsRight;
  }

  checkCodeInput(card: Card): boolean {
    return this.codeAnswers[card.Id].IsRight;
  }

  checkTestInput(card: Card): boolean {
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
    return customerRightAnswersCount === rightAnswersCount &&
      customerRightAnswersCount === customerAnswersCount;
  }

  saveStatistics(card: Card): void {
    if (this.authService.checkIfIsAuthorized()) {
      this.statisticsService.getStatisticsByUserAndCard(
        this.authService.getCurrentUserLogin(),
        card.Id
      ).subscribe(
        statistics => {
          if (statistics) {
            statistics.CardStatus = this.checkCard(card)
              ? CARD_STATUS.CORRECT
              : CARD_STATUS.INCORRECT;
            this.statisticsService.updateStatistics(statistics).subscribe();
          }
        },
        err => handleError);
    }
  }
}
