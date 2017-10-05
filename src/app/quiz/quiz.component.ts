import { Component, ElementRef, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { QuizService } from '../common/services/quiz.service';
import { Card, Answer } from '../common/models/models';

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
        this.cards.forEach(card => {
            this.check(card);
        });
        this.quizService.cards = this.cards;
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
        return this.countPassedQuestions() === 1
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
        let isUncorrectChecked = false;
        let correctAnswersCount = 0;
        let checkedAnswersCount = 0;
        card.Answers.forEach(answer => {
            const lable = <HTMLInputElement>document.getElementById('answer' + answer.Id);
            if (answer.IsChecked) {
                checkedAnswersCount++;
                switch (answer.IsCorrect) {
                    case true:
                        lable.style.color = 'green';
                        correctAnswersCount++;
                        break;
                    case false:
                        lable.style.color = 'red';
                        isUncorrectChecked = true;
                        break;
                }
            } else {
                lable.style.color = 'black';
            }

            const cardTitle = <HTMLInputElement>document.getElementById('cardTitle' + card.Id);
            cardTitle.style.color = !isUncorrectChecked
                && correctAnswersCount === checkedAnswersCount
                ? 'green'
                : 'red';
        });
    }

    check(card: Card) {
        card.Answers.forEach(answer => {
            let result;
            if (answer.IsChecked && answer.IsCorrect) {
                result = '. And it is right';
            } else if (answer.IsChecked && !answer.IsCorrect) {
                result = '. And it is uncorrect';
            }
        });
    }

    saveAnswer() {
        const card: Card = this.cards[this.counter];
        setTimeout(function () {
            card.Answers.forEach(answer => {
                const checkbox = <HTMLInputElement>document.getElementById('checkbox' + answer.Id);
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
}
