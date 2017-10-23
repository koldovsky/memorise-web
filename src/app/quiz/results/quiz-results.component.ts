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
      // if (c.CardType.Name === 'Code input') {
      //   c.RightAnswersText = '';
      // }else {
      c.RightAnswersText = '';
      c.Answers.forEach(a => {
        if (a.IsCorrect === true) {
          c.RightAnswersText += a.Text + '; ';
        }
        c.RightAnswersText = c.RightAnswersText.substr(0, c.RightAnswersText.lastIndexOf(';'));
      });
      // }
    });
    this.cards.forEach(c => {
      c.CustomerAnswersText = '';
      // if (c.CardType.Name === 'Words input') {
      //   c.CustomerAnswersText = this.quizService.wordInputs
      //   .find(x => x.CardId === c.Id).CustomerAnswerText;
      // }else if (c.CardType.Name === 'Code input') {
      //   c.CustomerAnswersText = this.quizService.codeAnswers
      //   .find(x => x.CardId === c.Id).CodeAnswerText;
      // }
      c.Answers.forEach(a => {
        if (a.IsChecked === true) {
          c.CustomerAnswersText += a.Text + '; ';
        }
      });
      c.CustomerAnswersText = c.CustomerAnswersText.substr(0, c.CustomerAnswersText.lastIndexOf(';'));
    });
  }

  checkCard(card: Card): string {
    // if (card.CardType.Name === 'Words input') {
    //   card.Answers.forEach(x => {
    //     if (x.Text.trim() === this.quizService.wordInputs
    //     .find(y => y.CardId === card.Id).CustomerAnswerText.trim()) {
    //       return 'Right';
    //     } else {
    //       return 'Wrong';
    //     }
    //   });
    // } else if (card.CardType.Name === 'Code input') {
    //   if (this.quizService.codeAnswers.find(x => x.CardId === card.Id).IsRight){
    //     return 'Right';
    //   } else {
    //     return 'Wrong';
    //   }
    // }else {
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
  // }
  }
}
