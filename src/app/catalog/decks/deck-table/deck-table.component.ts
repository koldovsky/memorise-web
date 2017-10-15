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

    searchableList: string[];
    decks: Deck[];
    position: number[];
    path: string[] = ['Name'];
    totalCount: number;
    page = 0; pageSize = 3;
    index = 1;
    order = 1;
    pageResponse: PageResponse<Deck>;
    sorted: boolean;

    constructor(private deckService: DeckService
    ) {
        this.searchableList = ['Name'];
        this.pageResponse = new PageResponse<Deck>();
        this.pageResponse.items = [];
    }

    ngOnInit() {
        this.onNotify(this.page);
        this.deckService.getDecks()
            .then(decks => this.totalCount = decks.length);
    }

    onNotify(index: number): void {
        this.deckService.getDecksByPage(index + 1, this.pageSize)
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

    // sortTable() {
    //     this.deckService.getSortedDecks(this.sorted)
    //         .then( temp => {
    //             temp = temp.reverse();
    //             this.decks = temp;
    //         }
    //         );
    // }
}
