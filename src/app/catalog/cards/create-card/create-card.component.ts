import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Card, CardType, Deck, Answer } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';

import { handleError } from '../../../common/functions/functions';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';
import { Observable } from 'rxjs/Observable';
import { CardService } from '../../../common/services/card.service';
import { ModerationService } from '../../../common/services/moderation.service';

@Component({
    selector: 'create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.css']
})

export class CreateCardComponent implements OnInit {

    regex;
    error;
    card: Card;
    deck: Deck;
    cardTypes: CardType[];
    isLoaded = false;
    afterCheck = false;
    arrayIsReady = false;
    submitMessage = '';
    correctAnswer = '';
    numbersOfAnswers: number[];
    chosenNumbersOfAnswers: number;
    numberOfCorrectAnswer: number;
    answersArray: Answer [];

    constructor(
        private authService: AuthService,
        private cardService: CardService,
        private moderationService: ModerationService
    ) {
        this.card = {
            Question: '',
            Answers: null
        };
        this.numbersOfAnswers = [2, 3, 4, 5, 6];
        this.chosenNumbersOfAnswers = 0;
    }

    @Output()
    afterCardAdded: EventEmitter<Card> = new EventEmitter<Card>();
    ngOnInit(): void {
        this.regex = regexExpression;
        this.error = errorMessages;
        this.deck = this.moderationService.getCurrentDeck();

        this.cardService.getCardTypes()
            .subscribe(response => {
                this.cardTypes = response as CardType[];
                this.isLoaded = true;
            });
    }

    onSelectNumber(item: number) {
        this.chosenNumbersOfAnswers = item;
        this.numberOfCorrectAnswer = 0;
        this.createAnswersArray(item);
        this.arrayIsReady = true;
    }

    createAnswersArray(numbers: number) {
        this.answersArray = [];
        for (let i = 0; i < numbers; i++) {
            this.answersArray.push({Id: i, Text : '', IsCorrect : false } as Answer );
        }
    }
    onSubmit(form: NgForm) {
        if (this.numberOfCorrectAnswer > 0) {
            this.answersArray[this.numberOfCorrectAnswer].IsCorrect = true;
        }
        if (this.chosenNumbersOfAnswers > 0) {
            this.card.Answers = this.answersArray;
        }
        if (this.chosenNumbersOfAnswers === 0) {
            this.card.Answers = [];
            this.card.Answers.push({Text: this.correctAnswer, IsCorrect: true} as Answer);
        }
        this.createCard();
        form.reset();
    }

    createCard() {
        this.card.DeckName = this.deck.Name;
        this.cardService.createCard(this.card)
        .subscribe(card => {
            this.submitMessage = 'Card was created successfully';
            this.showSnackbar();
            this.afterCardAdded.emit(card as Card);
        },
        err => {
            this.submitMessage = this.error.ERROR;
            this.showSnackbar();
        }
        );
    }

    showSnackbar() {
        const x = document.getElementById('snackbar');
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }
}
