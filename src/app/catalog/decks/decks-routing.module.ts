import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DeckDetailsComponent } from '../decks/deck-details/deck-details.component';
import { DecksComponent } from './decks.component';

const route: Routes = [
    {
        path: 'decks',
        component: DecksComponent
    },
    {
        path: 'decks/:name',
        component: DeckDetailsComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(route)
    ],
    exports: [
        RouterModule
    ]
})
export class DecksRoutingModule { }
