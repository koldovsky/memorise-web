import { Component, OnInit, NgModule } from '@angular/core';
import { CardService } from '../../../common/services/card.service';
import { Card, Deck, CardType } from '../../../common/models/models';
import { DeckService } from '../../../common/services/deck.service';

@Component({
    selector: 'app-card-table',
    templateUrl: './card-table.component.html',
    styleUrls: ['./card-table.component.css']
})

export class CardTableComponent implements OnInit {

    cards: Card[];
    deckName: Deck;
    decks: Deck[];

    constructor(
        private cardService: CardService,
        private deckService: DeckService
    ) { }

    ngOnInit() {
        this.deckService.getDecks()
            .then(decks => {
            this.decks = decks;
            let tempArr = [];
                for (let i = 0; i < this.decks.length; i++) {
                    tempArr.push(decks[i].Linking);
                    // this.cardService.getCards('/' + this.decks[i].Linking)
                    //     .then(cards => this.cards = cards);
                }
                this.cardService.getCards(tempArr)
                    .then(cards => this.cards = cards);
            });
        // this.cardService.getCards('Arrays')
        //     .then(cards => this.cards = cards);
    }
}
