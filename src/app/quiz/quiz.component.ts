import { Component, ElementRef, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { QuizService } from '../common/services/quiz.service';
import { Card, Answer, WordInput, CodeAnswer } from '../common/models/models';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute
    ) { }

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

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                if (params.get('from') === 'course') {
                    return this.quizService
                        .GetCardsByCourse(decodeURIComponent(params.get('name')));
                } else {
                    return this.quizService
                        .GetCardsByDeck(decodeURIComponent(params.get('name')));
                }
            })
            .subscribe(cards => {
                this.cards = cards;
                this.cardsCount = cards.length;
                this.cards.forEach(card => {
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
        // // console.log('this.cards.length: ' + this.cards.length);
        // this.codeAnswers = [];
        // this.wordInputs = [];
        // // console.log('this.codeAnswers.length: ' + this.codeAnswers.length);
        // // console.log('this.wordInputs.length: ' + this.wordInputs.length);
        // for (let i = 0; i < this.cards.length; i++) {
        //     if (this.cards[i].CardType.Name === 'Words input') {
        //         this.wordInputCheck(this.cards[i], false);
        //         // console.log('In Words input');
        //     } else if (this.cards[i].CardType.Name === 'Code input') {
        //         this.codeAnswerCheck(this.cards[i]);
        //         // console.log('In Code input');
        //     }
        // }
        // // this.cards.forEach(x => {
        // //     console.log('In this.cards.forEach');
        // //     if (x.CardType.Name === 'Words input') {
        // //         this.wordInputCheck(x, false);
        // //         console.log('In Words input');
        // //     } else if (x.CardType.Name === 'Code input') {
        // //         this.codeAnswerCheck(x);
        // //         console.log('In Code input');
        // //     }
        // // });
        // console.log('this.codeAnswers.length: ' + this.codeAnswers.length);
        // console.log('this.wordInputs.length: ' + this.wordInputs.length);
        // this.quizService.codeAnswers = this.codeAnswers;
        // this.quizService.wordInputs = this.wordInputs;
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
        }
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

            const cardTitle = <HTMLInputElement>document.getElementById('cardTitle' + card.Id);

            if (!isUncorrectChecked && correctAnswersCount === checkedAnswersCount) {
                cardTitle.style.color = this.correctColor;
                cardTitle.style.fontWeight = 'bold';
            } else {
                cardTitle.style.color = this.uncorrectColor;
                cardTitle.style.fontWeight = 'bold';
            }
        });
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
            console.log('this.innerWordInputCheck(card);');
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
            return;
        }
    }

    codeAnswerCheck(card: Card) {
        this.codeResult = '';
        this.codeAnswers[card.Id] = {
            CardId: card.Id,
            CodeAnswerText: card.Answers[0].Text,
            IsRight: false
        };
        this.quizService.codeAnswer(this.codeAnswers[card.Id])
            .then(codeAnswer => {
                this.codeResult = codeAnswer.CodeAnswerText;
                this.codeAnswers[card.Id].IsRight = codeAnswer.IsRight;
                console.log('this.quizService.codeAnswer');
            });
    }
}