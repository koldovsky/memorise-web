import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Card } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class QuizService {
    private QuizUrl = 'http://localhost:37271/Quiz/';

    constructor(private http: Http) { }

    GetCardsByDeck(name: string): Promise<Card[]> {
        const URL = `${this.QuizUrl}GetCardsByDeck/${name}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => {
                 console.log(response);
                console.log(response.json());
                return response.json() as Card[]; })
            .catch(handleError);
    }
}