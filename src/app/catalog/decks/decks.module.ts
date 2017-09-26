import { NgModule } from '@angular/core';

import { DecksRoutingModule } from './decks-routing.module';
import { DecksComponent } from './decks.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { DeckService } from '../../common/services/deck.service';


@NgModule({
    imports: [
        DecksRoutingModule
    ]
})

export class DecksModule { }
