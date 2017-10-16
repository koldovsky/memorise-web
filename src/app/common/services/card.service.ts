import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Card } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CardService {
    private CardUrl = 'http://localhost:37271/Quiz';

    constructor(private http: HttpClient) { }

    getCards(deckName: string[]): Promise<Card[]> {
        let param = '';
        for ( let i = 0; i < deckName.length; i++) {
            param = param + ',' + deckName[i];
        }
        const URL = `${this.CardUrl}/GetCardsByDeckArray/${param}`;
        return this.http.get(URL)
        .toPromise()
        .then(response => {console.log(response); return response as Card[];  })
        .catch(handleError);
    }
}
