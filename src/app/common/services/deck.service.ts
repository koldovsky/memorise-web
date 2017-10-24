import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Deck, PageResponse, SearchDataModel } from '../models/models';
import { handleError } from '../functions/functions';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeckService {
    private decksUrl = 'http://localhost:37271/Catalog';
    private decksPageUrl = 'http://localhost:37271/Catalog/GetDecksByPage';
    private decksSearchUrl = 'http://localhost:37271/Catalog/GetDeckBySearch';
    private decksDetailsUrl = 'http://localhost:37271/DeckDetails';
    private deckModeratorUrl = 'http://localhost:37271/Moderator/';

    btnInfoLinking = '';

    constructor(private http: HttpClient) { }

    getDecks(): Promise<Deck[]> {
        const url = `${this.decksUrl}/GetDecks`;
        return this.http.get(url)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    getDecksByPage(page: number, pageSize: number, sorted: boolean, search: string): Promise<PageResponse<Deck>> {
        const postData = new SearchDataModel;
        postData.page = page; postData.pageSize = pageSize;
        postData.searchString = search; postData.sort = sorted;
        const url = this.decksPageUrl;
        return this.http.post(url, postData)
            .toPromise()
            .then(response => response as PageResponse<Deck>)
            .catch(handleError);
    }

    getDecksByCourseName(courseName: string) {
        const URL = `${this.decksUrl}/GetAllDecksByCourse/${courseName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    getDeckByLinking(linking: string) {
        const URL = `${this.decksUrl}/GetDeckByLinking/${linking}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck)
            .catch(handleError);
    }
    createDeck(deck: Deck): Observable<Object> {
        return this.http.post(`${this.deckModeratorUrl}CreateDeck`, deck);
    }

    updateDeck(deck: Deck) {
        return this.http.put(`${this.deckModeratorUrl}UpdateDeck`, deck);
    }

    deleteDeck(id: number) {
        return this.http.delete(`${this.deckModeratorUrl}DeleteDeck/${id}`);
    }

    checkIfDeckExists(deckName: string): Observable<Object> {
        return this.http.get(`${this.deckModeratorUrl}FindDeckByName/${btoa(deckName)}`);
    }
}
