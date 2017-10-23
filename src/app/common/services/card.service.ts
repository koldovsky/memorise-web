import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Card } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CardService {
    private CardUrl = 'http://localhost:37271/Quiz';
    private cardModeratorUrl = 'http://localhost:37271/Moderator/';
    btnInfoLinking = '';
    constructor(private http: HttpClient) { }

    getCards(deckName: string[]): Promise<Card[]> {
        let param = '';
        for (let i = 0; i < deckName.length; i++) {
            param = param + ',' + deckName[i];
        }
        const URL = `${this.CardUrl}/GetCardsByDeckArray/${param}`;
        return this.http.get(URL)
            .toPromise()
            .then(response => { console.log(response); return response as Card[]; })
            .catch(handleError);
    }

    getCardTypes(): Observable<Object> {
        return this.http.get(`${this.cardModeratorUrl}GetCardsType`);
    }

    createCard(card: Card): Observable<Object> {
        return this.http.post(`${this.cardModeratorUrl}CreateCard`, card);
    }

    deleteCard(id: number) {
        return this.http.delete(`${this.cardModeratorUrl}DeleteCard/${id}`);
     };
}
