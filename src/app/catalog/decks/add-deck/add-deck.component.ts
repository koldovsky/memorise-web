import { Component, OnInit } from '@angular/core';

import { Deck } from '../../../common/models/models';
import { DeckService } from '../../../common/services/deck.service';

@Component({
    selector: 'add-deck',
    templateUrl: './add-deck.component.html',
    styleUrls: ['./add-deck.component.css']
})

export class AddDeckComponent implements OnInit {
    decks: Deck[];

    constructor(
        private deckService: DeckService
    ) { }

    ngOnInit() {
        this.deckService.getDecks()
            .then(decks => { this.decks = decks; });
    }
}
