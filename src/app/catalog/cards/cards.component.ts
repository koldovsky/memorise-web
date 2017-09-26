import { Component, OnInit } from '@angular/core';

import { Card } from '../../common/models/models';
import { CardService } from '../../common/services/card.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html'
})

export class CardsComponent implements OnInit {
    constructor(private cardService: CardService) { }
    cards: Card[];

    ngOnInit(): void {
        this.cardService.getCards(name)
            .then(cards => this.cards = cards);
        }
}