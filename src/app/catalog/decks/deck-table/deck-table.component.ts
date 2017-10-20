import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';

import * as _ from 'underscore';

import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortingPipe } from '../../../pipes/sorting.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { NumberToArrayPipeComponent } from '../../../pipes/number-to-array.pipe';

import { Deck, PageResponse } from '../../../common/models/models';
import { DeckService } from '../../../common/services/deck.service';
import { MessageService } from '../../../common/services/message.service';

@Component({
    selector: 'app-deck-table',
    templateUrl: './deck-table.component.html',
    styleUrls: ['./deck-table.component.css']
})

export class DeckTableComponent implements OnInit {

    decks: Deck[];
    arrayOfElementByPage = [1, 2, 3, 4, 5, 10, 20, 'All'];
    totalCount: number;
    page = 0; pageSize = this.arrayOfElementByPage[0];
    pageResponse: PageResponse<Deck>;
    sorted: boolean;
    searchText: string;
    currentDeck: Deck;

    constructor(private deckService: DeckService
    ) {
        this.pageResponse = new PageResponse<Deck>();
        this.pageResponse.items = [];
        this.currentDeck = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
    }

    ngOnInit() {
        this.sortTable();
    }

    onNotify(index: number): void {
        this.deckService.getDecksByPage(index + 1, +this.pageSize, this.sorted, this.searchText)
            .then(pageResponse => {
                this.decks = pageResponse.items;
                this.page = index;
                this.totalCount = pageResponse.totalCount;
            });
    }

    onNext(): void {
        this.onNotify(this.page + 1);
    }

    onPrev(): void {
        this.onNotify(this.page - 1);
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

    onChange(event: any) {
        this.onNotify(0);
    }

    onDeckAdded(newDeck: Deck): void {
        this.decks.pop();
        this.decks.unshift(newDeck);
    }

    onDelete(deck: Deck): void {
        this.currentDeck = deck;
    }

    confirmDelete(): void {
        this.deckService.deleteDeck(this.currentDeck.Id)
            .subscribe(() => {
                this.decks = this.decks.filter(x => x.Id !== this.currentDeck.Id);
            },
            (err) => console.log(err)
            );
    }

    onBtnInfoClick(btnInfoLinking: string) {
        this.deckService.btnInfoLinking = btnInfoLinking;
    }

    onSelectFilter(numberFilter: any): void {
        if (numberFilter === 'All') {
            numberFilter = 0;
        }
        this.pageSize = numberFilter;
        this.onNotify(0);
    }
}
