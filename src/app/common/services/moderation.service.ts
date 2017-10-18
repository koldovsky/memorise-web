import { Injectable } from '@angular/core';
import { Deck } from '../models/models';

@Injectable()
export class ModerationService {
    whichButtonIsClicked = 'categories';
    currentDeck: Deck;

    getCurrentDeck() {
        return this.currentDeck;
    }

    setCurrentDeck(deck: Deck) {
        this.currentDeck = deck;
    }
}

