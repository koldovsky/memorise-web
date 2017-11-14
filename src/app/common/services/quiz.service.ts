import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Card, CodeAnswer, Algorithm, WordInput, DataForGetCardsForSubscription, Deck, Course } from '../models/models';
import { handleError } from '../functions/functions';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

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

        const URL = `${environment.quizUrl}/GetCardsForSubscribedCourse/`
        + `${dataForCards.courseOrDeckLink}/${dataForCards.numberOfCards}/${dataForCards.userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    GetCardsForSubscribedDeck(dataForCards: DataForGetCardsForSubscription): Promise<Card[]> {

        const URL = `${environment.quizUrl}/GetCardsForSubscribedDeck/`
        + `${dataForCards.courseOrDeckLink}/${dataForCards.numberOfCards}/${dataForCards.userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Card[])
            .catch(handleError);
    }

    GetDecksNeedToRepeat(userLogin: string): Promise<Deck[]> {
        const URL = `${environment.quizUrl}/GetDecksNeedToRepeat/${userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    GetCoursesNeedToRepeat(userLogin: string): Promise<Course[]> {
        const URL = `${environment.quizUrl}/GetCoursesNeedToRepeat/${userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    SetSylesForSubscriptionsDropdownItem(IsCardsNeedForRepeat: boolean) {

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


    ChangeAlgorithm(algorithm: Algorithm): Observable<Object> {
        return this.http.put(`${environment.quizUrl}/ChangeAlgorithm`, algorithm);
    }

    GetAlgorithms(): Observable<Object> {
        return this.http.get(`${environment.moderationUrl}/GetAllAlgorithms`);
    }

}
