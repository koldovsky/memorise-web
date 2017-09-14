import { Injectable } from '@angular/core';

import { Deck } from '../models/models';
import { Http } from '@angular/http';
import { handleError } from '../functions/functions';

import 'rxjs/add/operator/toPromise';

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
        const url = `${this.decksUrl}/GetAllDecksByCourseName/${courseName}`;
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Deck[])
        .catch(handleError);
    }
}
