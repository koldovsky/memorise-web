import { Component, OnInit } from '@angular/core';
import { Deck } from '../../common/models/models';
import { DeckService } from '../../common/services/deck.service';

@Component({
    selector: 'app-decks',
    templateUrl: './decks.component.html'
})

export class DecksComponent implements OnInit {
    constructor(private deckService: DeckService) { }
    decks: Deck[];

    ngOnInit(): void {
        this.deckService.getDecks()
            .then(decks => this.decks = decks);
    }
}
