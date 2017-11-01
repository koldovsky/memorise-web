import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Deck, PageResponse, SearchDataModel } from '../models/models';
import { handleError } from '../functions/functions';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class DeckService {

    btnInfoLinking = '';

    constructor(private http: HttpClient) { }

    getDecks(): Promise<Deck[]> {
        const url = `${environment.catalogUrl}/GetDecks`;
        return this.http.get(url)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    getDecksByPage(page: number, pageSize: number, sorted: boolean, search: string):
        Promise<PageResponse<Deck>> {
        const postData = new SearchDataModel;
        postData.page = page; postData.pageSize = pageSize;
        postData.searchString = search; postData.sort = sorted;
        const url = `${environment.catalogUrl}/GetDecksByPage`;
        return this.http.post(url, postData)
            .toPromise()
            .then(response => response as PageResponse<Deck>)
            .catch(handleError);
    }

    getDecksByCourseName(courseName: string) {
        const URL = `${environment.catalogUrl}/GetAllDecksByCourse/${courseName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    getDeckByLinking(linking: string) {
        const URL = `${environment.catalogUrl}/GetDeckByLinking/${linking}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck)
            .catch(handleError);
    }
    createDeck(deck: Deck): Observable<Object> {
        return this.http.post(`${environment.moderationUrl}/CreateDeck`, deck);
    }

    updateDeck(deck: Deck) {
        return this.http.put(`${environment.moderationUrl}/UpdateDeck`, deck);
    }

    deleteDeck(id: number) {
        return this.http.delete(`${environment.moderationUrl}/DeleteDeck/${id}`);
    }

    checkIfDeckExists(deckName: string): Observable<Object> {
        return this.http.get(`${environment.moderationUrl}/FindDeckByName/${btoa(deckName)}`);
    }
}
