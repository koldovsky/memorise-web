import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Card, CardType, Deck, Answer } from '../../../common/models/models';

import { handleError } from '../../../common/functions/functions';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';
import { Observable } from 'rxjs/Observable';
import { CardService } from '../../../common/services/card.service';
import { ModerationService } from '../../../common/services/moderation.service';

@Component({
    selector: 'app-edit-card',
    templateUrl: './edit-card.component.html',
    styleUrls: ['./edit-card.component.css']
})

export class EditCardComponent implements OnInit {

    regex;
    error;
    card: Card;
    deck: Deck;
    isCardLoaded = false;
    submitMessage = '';
    chosenNumbersOfAnswers: number;
    numberOfCorrectAnswer: number;
    noCorrectAnswer = false;

    constructor(
        private cardService: CardService,
        private moderationService: ModerationService
    ) { }

    ngOnInit(): void {
        this.regex = regexExpression;
        this.error = errorMessages;
        this.deck = this.moderationService.getCurrentDeck();

        this.cardService.getCardById(this.cardService.btnInfoId)
            .subscribe(card => {
                this.card = card as Card;
                this.card.CardTypeName = (card as Card).CardType.Name;
                this.chosenNumbersOfAnswers = this.card.Answers.length;
                this.isCardLoaded = true;
                this.numberOfCorrectAnswer =  this.card.Answers.findIndex(x => x.IsCorrect === true);
            },
            (err) => console.log(err)
            );
    }

    onSubmit(form: NgForm) {
        if (this.card.CardTypeName === 'One answer') {
           this.card.Answers.forEach(x => x.IsCorrect = false);
           this.card.Answers[this.numberOfCorrectAnswer].IsCorrect = true;
        }
        this.updateCard();
    }

    updateCard() {
        this.card.DeckName = this.deck.Name;
        this.cardService.updateCard(this.card)
        .subscribe(card => {
            this.submitMessage = 'Card was updated successfully';
            this.showSnackbar();
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

    setWhichButtonIsClicked() {
        this.moderationService.whichButtonIsClicked = 'decks';
    }

    getCustomerTemplateCodeAnswer(card: Card): Answer {
        return card.Answers.find(answer => !answer.IsCorrect);
    }

    getCorrectCodeAnswer(card: Card): Answer {
        return card.Answers.find(answer => answer.IsCorrect);
    }

    changeCheckbox(i) {
       this.card.Answers[i].IsCorrect = !this.card.Answers[i].IsCorrect;
       const correctAnswers = this.card.Answers.findIndex(x => x.IsCorrect === true);
       if (correctAnswers === -1) {
        this.noCorrectAnswer = true;
       } else {
        this.noCorrectAnswer = false;
       }
    }
    changeRadio(i) {
        this.numberOfCorrectAnswer = i;
    }
}
