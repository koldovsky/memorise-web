import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Card } from '../models/models';

import 'rxjs/add/operator/toPromise';
import { handleError } from '../functions/functions';

@Injectable()
export class CardService {
    private CardUrl = 'http://localhost:37271/Catalog/GetCards';
    constructor(private http: Http) { }

    getCards(): Promise<Card[]> {
        return this.http.get(this.CardUrl)
            .toPromise()
            .then(response => {
                 console.log(response);
                console.log(response.json());
                return response.json() as Card[]; })
            .catch(handleError);
    }
}
