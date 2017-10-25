import { Injectable } from '@angular/core';
import { Deck } from '../models/models';

@Injectable()
export class ModerationService {
    whichButtonIsClicked = 'categories';
    currentDeck: Deck;
    count: number;

    getCurrentDeck() {
        return this.currentDeck;
    }

    // getCurrentDeckLinking() {
    //     return localStorage.getItem('deckLinking');
    // }

    setCurrentDeck(deck: Deck) {
        this.currentDeck = deck;
        // localStorage.setItem('deckLinking', deck.Linking);
    }
}

