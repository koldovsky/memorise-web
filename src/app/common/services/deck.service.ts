import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Deck } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class DeckService {
    private decksUrl = 'http://localhost:37271/Catalog';

    constructor(private http: Http) { }

    getDecks(): Promise<Deck[]> {
        const url = `${this.decksUrl}/GetDecks`;
         return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Deck[])
        .catch(handleError);
    }

    getDecksByCourseName(courseName: string) {
        const URL = `${this.decksUrl}/GetAllDecksByCourse/${courseName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response.json() as Deck[])
            .catch(handleError);
    }
}
