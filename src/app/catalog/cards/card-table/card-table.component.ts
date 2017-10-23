import { Component, OnInit, NgModule } from '@angular/core';
import { CardService } from '../../../common/services/card.service';
import { Card, Deck, CardType, PageResponse } from '../../../common/models/models';
import { DeckService } from '../../../common/services/deck.service';
import { ModerationService } from '../../../common/services/moderation.service';
import { CreateCardComponent } from '../create-card/create-card.component';
import { PaginationComponent } from '../../../pagination/pagination.component';

@Component({
    selector: 'app-card-table',
    templateUrl: './card-table.component.html',
    styleUrls: ['./card-table.component.css']
})

export class CardTableComponent implements OnInit {

    cards: Card[];
    deck: Deck;
    arrayOfElementByPage = [5, 10, 'All'];
    totalCount: number;
    page = 1; pageSize = this.arrayOfElementByPage[0];
    pageResponse: PageResponse<Card>;
    sorted: boolean;
    searchText: string;
    currentCard: Card;

    constructor(
        private cardService: CardService,
        private moderationService: ModerationService
    ) { }

    ngOnInit() {
        this.deck = this.moderationService.getCurrentDeck();
        this.onNotify(1);
    }

    onNotify(index: number): void {
        this.cardService.getSearchCardsByDeckLinking(index, +this.pageSize, this.sorted, this.searchText, 'BaseKnowledge')
            .then(pageResponse => {
                this.cards = pageResponse.items;
                this.page = index;
                this.totalCount = pageResponse.totalCount;
            });
    }

    sortTable() {
        if (this.sorted === false) {
            this.sorted = true;
        } else {
            this.sorted = false;
        }
        this.onNotify(this.page);
        return this.sorted;
    }

    onSelectFilter(numberFilter: any): void {
        if (numberFilter === 'All') {
            numberFilter = 0;
        }
        this.pageSize = numberFilter;
        this.onNotify(1);
    }


    onCardAdded(newCard: Card): void {
        this.cards.pop();
        this.cards.unshift(newCard);

    }
}
