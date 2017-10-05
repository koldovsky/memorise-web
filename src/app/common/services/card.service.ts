import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Card } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CardService {
    private CardUrl = 'http://localhost:37271/Quiz';

    constructor(private http: HttpClient) { }

    getCards(deckName: string): Promise<Card[]> {
        const URL = `${this.CardUrl}/GetCardsByDeck${deckName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => {
                console.log(response);
                console.log(response);
                return response as Card[];
            })
            .catch(handleError);
    }
}
