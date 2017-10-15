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
    currentDeck: Deck;

    constructor(private deckService: DeckService
    ) {
        this.searchableList = ['Name'];
        this.currentDeck = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
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

    onDeckAdded(newDeck:Deck):void{
        this.decks.pop();
        this.decks.unshift(newDeck);
    }

    onDelete(deck: Deck):void{
        this.currentDeck = deck;
    }

    confirmDelete():void{
        this.deckService.deleteDeck(this.currentDeck.Id)
        .subscribe(()=>{
        this.decks = this.decks.filter(x=>x.Id!==this.currentDeck.Id); 
        },
        (err)=>console.log(err)
        );
    }
}
