import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortingPipe } from '../../../pipes/sorting.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';

import { Deck } from '../../../common/models/models';
import { DeckService } from '../../../common/services/deck.service';

@Component({
    selector: 'app-deck-table',
    templateUrl: './deck-table.component.html',
    styleUrls: ['./deck-table.component.css']
})

export class DeckTableComponent implements OnInit {

    searchableList: string[];
    decks: Deck[];
    path: string[] = ['Name'];
    order = 1;

    constructor(private deckService: DeckService
    ) {
        this.searchableList = ['Name'];
    }

    ngOnInit() {
        this.deckService.getDecks()
            .then(decks => { this.decks = decks; });
    }

    sortTable(prop: string) {
        this.path = prop.split('.');
        this.order = this.order * (-1);
        return false;
    }
}
