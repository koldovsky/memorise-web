import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Deck } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class DeckService {
    private decksUrl = 'http://localhost:37271/Catalog';
    private decksDetailsUrl = 'http://localhost:37271/DeckDetails';

    constructor(private http: HttpClient) { }

    getDecks(): Promise<Deck[]> {
        const url = `${this.decksUrl}/GetDecks`;
         return this.http.get(url)
        .toPromise()
        .then(response => response as Deck[])
        .catch(handleError);
    }

    getDecksByCourseName(courseName: string) {
        const URL = `${this.decksUrl}/GetAllDecksByCourse/${courseName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }
    getDeckWithDetails(deckName: string): Promise<Deck> {
        const URL = `${this.decksDetailsUrl}/GetDeckWithDetails/${deckName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck)
            .catch(handleError);
    }
}
