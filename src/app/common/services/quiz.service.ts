import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Card, CodeAnswer } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class QuizService {
    private QuizUrl = 'http://localhost:37271/Quiz/';
    cards: Card[];

    constructor(private http: HttpClient) { }

    GetCardsByCourse(name: string): Promise<Card[]> {
        const URL = `${this.QuizUrl}GetCardsByCourse/${name}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    GetCardsByDeck(name: string): Promise<Card[]> {
        const URL = `${this.QuizUrl}GetCardsByDeck/${name}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }
    
    codeAnswer(codeAnswer: CodeAnswer): Promise<CodeAnswer> {
        return this.http.post(this.QuizUrl + "CodeAnswer", codeAnswer)
            .toPromise()
            .then(response => response as CodeAnswer)
            .catch(handleError);
    }
}
