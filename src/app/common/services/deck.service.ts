import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Deck, PageResponse } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class DeckService {
    private decksUrl = 'http://localhost:37271/Catalog';
    private decksPageUrl = 'http://localhost:37271/Catalog/GetDecksByPage';
    private decksSearchUrl = 'http://localhost:37271/Catalog/GetDeckBySearch';
    private decksDetailsUrl = 'http://localhost:37271/DeckDetails';
    private deckModeratorUrl = 'http://localhost:37271/Moderator/';

    constructor(private http: HttpClient) { }

    getDecks(): Promise<Deck[]> {
        const url = `${this.decksUrl}/GetDecks`;
        return this.http.get(url)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    getDecksByPage(page: number, pageSize: number, sorted: boolean): Promise<PageResponse<Deck>> {
        const url = this.decksPageUrl + '/' + page + '/' + pageSize + '/' + sorted;
        return this.http.get(url)
            .toPromise()
            .then(response => response as PageResponse<Deck>)
            .catch(handleError);
    }

    getSearchDecks(search: string): Promise<Deck[]> {
        const url = this.decksSearchUrl + '/' + search;
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
    createDeck(deck: Deck): void {
        this.http.post(this.deckModeratorUrl + 'CreateDeck', deck)
            .toPromise()
            .then()
            .catch(handleError);

    }

    checkIfDeckExists(deckName: string): Promise<Deck> {
        return this.http.get(this.deckModeratorUrl + 'FindDeckByName/' + deckName)
            .toPromise()
            .then(response => response as Deck)
            .catch(handleError);
    }
}
