import { Component, OnInit, NgModule } from '@angular/core';

import { CardService } from '../../../common/services/card.service';
import { Card, Deck, CardType } from '../../../common/models/models';
import { DeckService } from '../../../common/services/deck.service';
import { QuizService } from '../../../common/services/quiz.service';
import { ModerationService } from '../../../common/services/moderation.service';
import { CreateCardComponent } from '../create-card/create-card.component';

@Component({
    selector: 'app-card-table',
    templateUrl: './card-table.component.html',
    styleUrls: ['./card-table.component.css']
})

export class CardTableComponent implements OnInit {
    cards: Card[];
    deck: Deck;
    decks: Deck[];
    currentCard: Card;

    constructor(
        private cardService: CardService,
        private quizeService: QuizService,
        private moderationService: ModerationService
    ) {
        this.currentCard = {Question: ''};
    }

    ngOnInit() {
        // this.deckService.getDecks()
        //     .then(decks => {
        //         this.decks = decks;
        //         let tempArr = [];
        //         for (let i = 0; i < this.decks.length; i++) {
        //             tempArr.push(decks[i].Linking);
        //             // this.cardService.getCards('/' + this.decks[i].Linking)
        //             //     .then(cards => this.cards = cards);
        //         }
        //         this.cardService.getCards(tempArr)
        //             .then(cards => this.cards = cards);
        //     });
        this.deck = this.moderationService.getCurrentDeck();
        this.quizeService.GetCardsByDeck(this.deck.Linking)
            .then(cards => this.cards = cards);
    }

    onCardAdded(newCard: Card): void {
        this.cards.pop();
        console.log(newCard);
        this.cards.unshift(newCard);
    }

    onDelete(card: Card): void {
        this.currentCard = card;
    }

    confirmDelete(): void {
        this.cardService.deleteCard(this.currentCard.Id)
        .subscribe(() => {
      this.cards = this.cards.filter(x => x.Id !== this.currentCard.Id);
        },
        (err) => console.log(err)
        );
    }
    onBtnInfoClick(btnInfoLinking: string) {
        this.cardService.btnInfoLinking = btnInfoLinking;
    }
}
