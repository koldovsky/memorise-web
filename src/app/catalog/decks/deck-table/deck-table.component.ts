import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortingPipe } from '../../../pipes/sorting.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { NumberToArrayPipeComponent } from '../../../pipes/number-to-array.pipe';

import { Deck, PageResponse } from '../../../common/models/models';
import { DeckService } from '../../../common/services/deck.service';
import * as _ from 'underscore';

@Component({
    selector: 'app-deck-table',
    templateUrl: './deck-table.component.html',
    styleUrls: ['./deck-table.component.css']
})

export class DeckTableComponent implements OnInit {

    decks: Deck[];
    totalCount: number;
    page = 0; pageSize = 5;
    index = 1;
    pageResponse: PageResponse<Deck>;
    sorted: boolean;

    constructor(private deckService: DeckService
    ) {
        this.pageResponse = new PageResponse<Deck>();
        this.pageResponse.items = [];
    }

    ngOnInit() {
        this.sortTable();
        // this.onNotify(this.page);
        this.deckService.getDecks()
            .then(decks => this.totalCount = decks.length);
        console.log(this.searchList('X'));
    }

    onNotify(index: number): void {
        this.deckService.getDecksByPage(index + 1, this.pageSize, this.sorted)
            .then(decks => {
                this.pageResponse = decks;
                this.page = index;
            });
    }

    onNext(): void {
        this.onNotify(this.page + this.index);
    }

    onPrev(): void {
        this.onNotify(this.page - this.index);
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

    searchList(searchText: string) {
        this.deckService.getSearchDecks(searchText)
            .then(decks => this.decks = decks);
        return this.decks;
    }
}
