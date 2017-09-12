import { Injectable } from "@angular/core";

import { Deck } from "../models/models";
import { Http } from "@angular/http";
import { handleError } from "../functions/functions";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeckService {
    private decksUrl = 'http://localhost:37271/Catalog/GetAllDecks';
    constructor(private http: Http) { }

    getDecks(): Promise<Deck[]> {
        return this.http.get(this.decksUrl)
            .toPromise()
            .then(response => response.json().data as Deck[])
            .catch(handleError);
    }
}
