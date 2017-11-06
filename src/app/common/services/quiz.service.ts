import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Card, CodeAnswer, WordInput, DataForGetCardsForSubscription } from '../models/models';
import { handleError } from '../functions/functions';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuizService {
    cards: Card[];
    codeAnswers: CodeAnswer[];
    wordInputs: WordInput[];
    private styles = {};

    constructor(private http: HttpClient) { }

    GetCardsByCourse(name: string): Promise<Card[]> {
        const URL = `${environment.quizUrl}/GetCardsByCourse/${name}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    GetCardsByDeck(name: string): Promise<Card[]> {
        const URL = `${environment.quizUrl}/GetCardsByDeck/${name}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    CodeAnswerCheck(codeAnswer: CodeAnswer): Promise<CodeAnswer> {
        return this.http.post(`${environment.quizUrl}/CodeAnswerCheck`, codeAnswer)
            .toPromise()
            .then(response => response as CodeAnswer)
            .catch(handleError);
    }

    GetCardsForSubscribedCourse(dataForCards: DataForGetCardsForSubscription): Promise<Card[]> {
        const URL = `${environment.quizUrl}/GetCardsForSubscribedCourse/
        ${dataForCards.courseOrDeckLink}/${dataForCards.numberOfCards}/${dataForCards.userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    GetCardsForSubscribedDeck(dataForCards: DataForGetCardsForSubscription): Promise<Card[]> {
        const URL = `${environment.quizUrl}/GetCardsForSubscribedDeck/
        ${dataForCards.courseOrDeckLink}/${dataForCards.numberOfCards}/${dataForCards.userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    GetCardsNeedToRepeat(userId: string): Promise<Card[]> {
        const URL = `${environment.quizUrl}/GetCardsNeedToRepeat/${userId}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    SetSylesForSubscriptionsDropdownItem(IsCardsNeedForRepeat: boolean) {
        console.log("IsCardsNeedForRepeat" + IsCardsNeedForRepeat);
        if (IsCardsNeedForRepeat) {
          this.styles = {
            'color': 'red',
          };
        }else {
            this.styles = {
                'color': 'black',
              };
        }
    }

    GetSylesForSubscriptionsDropdownItem() {
        return this.styles;
    }

}
