import { Component, ElementRef, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { QuizService } from '../common/services/quiz.service';
import { Card, Answer, WordInput, CodeAnswer, DataForGetCardsForSubscription } from '../common/models/models';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
     this.dataForCards = {
      numberOfCards: 10,
      userLogin: '',
      courseOrDeckLink: ''
   };
  }

  cards: Card[] = null;
  cardsCount;
  counter = 0;
  isLoaded = false;
  correctColor = 'limeGreen';
  uncorrectColor = 'red';
  customerAnswer = '';
  wordInputs: WordInput[] = [];
  customerCodeAnswer = '';
  codeAnswers: CodeAnswer[] = [];
  codeResult: string;
  MAX_NUMBERS_OF_CARDS = 10;
  quizType: string;
  dataForCards: DataForGetCardsForSubscription;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.quizType = params.get('quizType');
        this.dataForCards.courseOrDeckLink = params.get('name');
        if (this.quizType === 'try') {
          if (params.get('from') === 'course') {
            return this.quizService
              .GetCardsByCourse(this.dataForCards.courseOrDeckLink);
          } else {
            return this.quizService
              .GetCardsByDeck(this.dataForCards.courseOrDeckLink);
          }
        } else {
          this.dataForCards.userLogin = this.authService.getCurrentUserLogin();
          if (params.get('from') === 'course') {
            return this.quizService
              .GetCardsForSubscribedCourse(this.dataForCards);
          } else {
             return this.quizService
              .GetCardsForSubscribedDeck(this.dataForCards);
          }
        }
      })
      .subscribe(cards => {
        if (this.quizType === 'try') {
          this.cards = cards.slice(0, this.MAX_NUMBERS_OF_CARDS);
        } else {
          this.cards = cards;
        }
        this.cardsCount = this.cards.length;
        this.cards.forEach(card => {
          card.IsDisabled = false;
          card.Answers.forEach(answer => {
            this.answerCheck(answer, false);
          });
        });
        this.isLoaded = true;
      });
  }

  counterMinus() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  counterPlus() {
    if (this.counter < this.cards.length - 1) {
      this.counter++;
    }
  }

  heapCtrl() {
    if (!this.counter) {
      document.getElementById('leftHeap').hidden = true;
      document.getElementById('RightHeap').hidden = false;
    } else if (this.counter === this.cards.length - 1) {
      document.getElementById('leftHeap').hidden = false;
      document.getElementById('RightHeap').hidden = true;
    } else {
      document.getElementById('leftHeap').hidden = false;
      document.getElementById('RightHeap').hidden = false;
    }
  }

  finishQuiz() {
    this.quizService.cards = this.cards;
    this.codeAnswers = [];
    this.wordInputs = [];
    this.cards.forEach(x => {
      if (x.CardType.Name === 'Words input') {
        this.wordInputCheck(x, false);
      } else if (x.CardType.Name === 'Code input') {
        this.codeAnswerCheck(x);
      }
    });
    this.quizService.codeAnswers = this.codeAnswers;
    this.quizService.wordInputs = this.wordInputs;
  }

  countPassedQuestions(): number {
    return this.counter;
  }

  countLeftQuestions(): number {
    return (this.cards.length - 1) - this.counter;
  }

  passedQuestionOrQuestions(): string {
    return this.countPassedQuestions() === 1
      ? 'question'
      : 'questions';
  }

  leftQuestionOrQuestions(): string {
    return this.countLeftQuestions() === 1
      ? 'question'
      : 'questions';
  }

  changeAnswerCheck(answer: Answer) {
    answer.IsChecked = !answer.IsChecked;
  }

  changeAnswerSelect(answer: Answer) {
    this.cards[this.counter].Answers.forEach(ans => {
      ans.IsChecked = answer === ans;
    });
  }

  answerCheck(answer: Answer, IsChecked: boolean) {
    answer.IsChecked = IsChecked;
  }

  checkQuestion() {
    const card: Card = this.cards[this.counter];
    if (this.cards[this.counter].CardType.Name === 'Words input') {
      this.wordInputCheck(card, true);
    } else if (this.cards[this.counter].CardType.Name === 'Code input') {
      this.codeAnswerCheck(card);
    } else {
      this.OneAndFewAnswersCheck(card);
    }
  }

  OneAndFewAnswersCheck(card: Card) {
    let isUncorrectChecked = false;
    let correctAnswersCount = 0;
    let checkedAnswersCount = 0;
    card.Answers.forEach(answer => {
      const lable = <HTMLInputElement>document.getElementById('answer' + answer.Id);
      if (answer.IsChecked) {
        checkedAnswersCount++;
        switch (answer.IsCorrect) {
          case true:
            lable.style.color = this.correctColor;
            lable.style.fontWeight = 'bold';
            correctAnswersCount++;
            break;
          case false:
            lable.style.color = this.uncorrectColor;
            lable.style.fontWeight = 'bold';
            isUncorrectChecked = true;
            break;
        }
      } else if (answer.IsCorrect) {
        lable.style.color = this.correctColor;
        lable.style.fontWeight = 'bold';
        correctAnswersCount++;
      } else {
        lable.style.color = 'black';
      }
      this.cardTitleManager(isUncorrectChecked, correctAnswersCount,
        checkedAnswersCount, card.Id
      );
    });
  }

  cardTitleManager(
    isUncorrectChecked: boolean,
    correctAnswersCount: number,
    checkedAnswersCount: number,
    cardId: number
  ) {
    const cardTitle = <HTMLInputElement>document.getElementById('cardTitle' + cardId);
    if (!isUncorrectChecked && correctAnswersCount === checkedAnswersCount) {
      cardTitle.style.color = this.correctColor;
      cardTitle.style.fontWeight = 'bold';
    } else {
      cardTitle.style.color = this.uncorrectColor;
      cardTitle.style.fontWeight = 'bold';
    }
  }

  saveAnswer() {
    const card: Card = this.cards[this.counter];
    setTimeout(function () {
      card.Answers.forEach(answer => {
        const checkbox = <HTMLInputElement>document.getElementById('item' + answer.Id);
        if (answer.IsChecked) {
          checkbox.checked = true;
        }
      });
    }, 20);
  }

  getImgPreNameLeft(): string {
    if ((this.cardsCount - 2) === this.counter) {
      return '1';
    } else if ((this.cardsCount - 3) === this.counter) {
      return '2';
    } else {
      return '3';
    }
  }

  getImgPreNamePassed(): string {
    switch (this.counter) {
      case 1: return '1';
      case 2: return '2';
      default: return '3';
    }
  }

  cleanColor() {
    const card: Card = this.cards[this.counter];
    const cardId: number = card.Id;
    setTimeout(function () {
      const cardTitle = <HTMLInputElement>document
        .getElementById('cardTitle' + cardId);
      cardTitle.style.color = 'black';
    }, 20);
  }

  cleanCustomerAnswerInput() {
    this.customerAnswer = '';
    this.codeResult = '';
  }

  innerWordInputCheck(card: Card) {
    card.Answers
      .forEach(x => {
        if (x.Text.trim() === card.CustomerAnswersText.trim()) {
          this.wordInputs[card.Id].IsRight = true;
        }
        this.wordInputs[card.Id].RightAnswersText.push(x.Text);
      });
  }
  wordInputCheck(card: Card, addStyles: boolean) {
    if (card.CustomerAnswersText) {
      this.wordInputs[card.Id] = {
        CardId: card.Id,
        CustomerAnswerText: card.CustomerAnswersText,
        RightAnswersText: [],
        IsRight: false
      };
      this.innerWordInputCheck(card);
      if (addStyles) {
        const cardTitle = <HTMLInputElement>document.getElementById('cardTitle' + card.Id);
        if (this.wordInputs[card.Id].IsRight) {
          cardTitle.style.color = this.correctColor;
          cardTitle.style.fontWeight = 'bold';
        } else {
          cardTitle.style.color = this.uncorrectColor;
          cardTitle.style.fontWeight = 'bold';
        }
      }
    } else {
      this.wordInputs[card.Id] = {
        CardId: card.Id,
        CustomerAnswerText: '',
        RightAnswersText: [],
        IsRight: false
      };
      card.CustomerAnswersText = '';
      this.innerWordInputCheck(card);
    }
  }

  getUserTemplateCodeAnswer(card: Card): Answer {
    return card.Answers.find(answer => !answer.IsCorrect);
  }

  codeAnswerCheck(card: Card) {
    this.codeResult = '';
    this.codeAnswers[card.Id] = {
      CardId: card.Id,
      CodeAnswerText: card.Answers[0].Text,
      IsRight: false
    };
    this.quizService.CodeAnswerCheck(this.codeAnswers[card.Id])
      .then(codeAnswer => {
        this.codeResult = codeAnswer.CodeAnswerText;
        this.codeAnswers[card.Id].IsRight = codeAnswer.IsRight;
      });
  }

  isCheckDisabled(card: Card) {
    let flag = true;
    card.Answers.forEach(answer => {
      if (answer.IsChecked === true) {
        flag = false;
      }
    });
    if (card.IsDisabled) {
      flag = true;
    }
    return flag;
  }

  cardDisabledToTrue(card: Card) {
    card.IsDisabled = true;
  }
}
