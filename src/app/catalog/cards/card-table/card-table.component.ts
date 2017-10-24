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
    arrayOfElementByPage = [1, 5, 10, 'All'];
    totalCount: number;
    page = 1; pageSize = this.arrayOfElementByPage[0];
    pageResponse: PageResponse<Card>;
    sorted: boolean;
    searchText: string;
    currentCard: Card;

    constructor(
        private cardService: CardService,
        private moderationService: ModerationService
    ) {
        this.currentCard = {Question: ''};
    }

    ngOnInit() {
        this.deck = this.moderationService.getCurrentDeck();
        this.sortTable();
    }

    onNotify(index: number): void {
        this.cardService.getSearchCardsByDeckLinking(this.deck.Linking, index, +this.pageSize, this.sorted, this.searchText)
            .then(pageResponse => {
                this.cards = pageResponse.items;
                this.page = index;
                this.totalCount = pageResponse.totalCount;
            });
    }

    onChange(event: any) {
        this.onNotify(1);
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

    dropDownElements() {
        if (this.pageSize === 0) {
            return 'Elements by Page: All';
        } else {
            return 'Elements by Page: ' + this.pageSize;
        }
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
