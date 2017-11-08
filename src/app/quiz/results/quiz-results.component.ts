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
    this.cards.forEach(card => {
      if (card.CardType.Name === 'Words input') {
        card.RightAnswersText = this.wordInputs[card.Id].RightAnswersText.join('; ');
      } else if (card.CardType.Name === 'Code input') {
        card.RightAnswersText = '';
      } else {
        card.RightAnswersText = '';
        card.Answers.forEach(answer => {
          if (answer.IsCorrect === true) {
            card.RightAnswersText += answer.Text + '; ';
          }
        });
        card.RightAnswersText = card.RightAnswersText.substr(0, card.RightAnswersText.lastIndexOf(';'));
      }
    });
    this.cards.forEach(card => {
      card.CustomerAnswersText = '';
      if (card.CardType.Name === 'Words input') {
        card.CustomerAnswersText = this.wordInputs[card.Id].CustomerAnswerText;
      } else if (card.CardType.Name === 'Code input') {
        card.CustomerAnswersText = this.codeAnswers[card.Id].CodeAnswerText;
      } else {
        card.Answers.forEach(answer => {
          if (answer.IsChecked === true) {
            card.CustomerAnswersText += answer.Text + '; ';
          }
        });
        card.CustomerAnswersText = card.CustomerAnswersText.substr(0, card.CustomerAnswersText.lastIndexOf(';'));
      }
      this.saveStatistics(card);
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
    card.Answers.forEach(answer => {
      if (answer.IsChecked) {
        customerAnswersCount++;
        if (answer.IsCorrect) {
          customerRightAnswersCount++;
        }
      }
      if (answer.IsCorrect) {
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
