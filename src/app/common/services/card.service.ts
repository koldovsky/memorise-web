import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Card, PageResponse, SearchDataModel } from '../models/models';
import { handleError } from '../functions/functions';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardService {
    btnInfoId: number;
    constructor(private http: HttpClient) { }

    getCards(deckName: string[]): Promise<Card[]> {
        let param = '';
        for (let i = 0; i < deckName.length; i++) {
            param = param + ',' + deckName[i];
        }
        const URL = `${environment.quizUrl}/GetCardsByDeckArray/${param}`;
        return this.http.get(URL)
            .toPromise()
            .then(response => { console.log(response); return response as Card[]; })
            .catch(handleError);
    }

    getSearchCardsByDeckLinking(deckLinking: string, page: number, pageSize: number, sorted: boolean, search: string):
        Promise<PageResponse<Card>> {
        const postData = new SearchDataModel;
        postData.page = page; postData.pageSize = pageSize;
        postData.searchString = search; postData.sort = sorted;
        postData.deckLinking = deckLinking;
        const url = `${environment.quizUrl}/GetSearchCardsByDeckLinking`;
        return this.http.post(url, postData)
            .toPromise()
            .then(response => response as PageResponse<Card>)
            .catch(handleError);
    }

    getCardTypes(): Observable<Object> {
        return this.http.get(`${environment.moderationUrl}/GetCardsType`);
    }

    createCard(card: Card): Observable<Object> {
        return this.http.post(`${environment.moderationUrl}/CreateCard`, card);
    }

    deleteCard(id: number) {
        return this.http.delete(`${environment.moderationUrl}/DeleteCard/${id}`);
    }

    getCardById(id: number): Observable<Object> {
        return this.http.get(`${environment.moderationUrl}/GetCardById/${id}`);
    }

    updateCard(card: Card): Observable<Object> {
        return this.http.put(`${environment.moderationUrl}/UpdateCard`, card);
    }
}
