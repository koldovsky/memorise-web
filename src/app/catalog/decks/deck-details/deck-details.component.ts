import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { DeckService } from '../../../common/services/deck.service';
import { Deck } from '../../../common/models/models';


@Component({
    selector: 'app-deck-details',
    templateUrl: './deck-details.component.html',
    styleUrls: ['./deck-details.component.css']
})

export class DeckDetailsComponent implements OnInit {
    constructor(
        private deckService: DeckService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    deck: Deck;

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.deckService
            .getDeckWithDetails(params.get('name')))
            .subscribe(deck => {
                this.deck = deck;
            });
    }

    goBack(): void {
        this.location.back();
    }
}
