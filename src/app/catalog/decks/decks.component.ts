import { Component, OnInit } from '@angular/core';

import { Deck, Category } from '../../common/models/models';
import { DeckService } from '../../common/services/deck.service';
import { MessageService } from '../../common/services/message.service';
import { CategoryService } from '../../common/services/category.service';

@Component({
    selector: 'app-decks',
    templateUrl: './decks.component.html',
    styleUrls: ['./decks.component.css']
})

export class DecksComponent implements OnInit {
    constructor(private deckService: DeckService,
        private messageService: MessageService,
        private categoryService: CategoryService) { }
    decks: Deck[];

    ngOnInit(): void {
        if (this.messageService.temp) {
            const category = this.messageService.temp as Category;
            this.categoryService.getDecksByCategory(category.Linking)
                .then(decks => this.decks = decks);
        } else {
            this.deckService.getDecks()
                .then(decks => this.decks = decks);
        }

        this.messageService.getMessage().subscribe(data => {
            if (data) {
                const category = data as Category;
                this.categoryService.getDecksByCategory(category.Linking)
                    .then(decks => this.decks = decks);
            }
        });
    }
}
