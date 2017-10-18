import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Statistics, Course, Deck } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class StatisticsService {
    private StatisticsUrl = 'http://localhost:37271/Statistics';

    constructor(private http: HttpClient) { }

    getStatisticsByUser(userLogin: string): Promise<Statistics[]> {
        const URL = `${this.StatisticsUrl}/GetStatistics/${userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => {
                return response as Statistics[];
            })
            .catch(handleError);
    }

    getStatisticsByUserAndCard(userLogin: string, cardId: number): Promise<Statistics[]> {
        const URL = `${this.StatisticsUrl}/GetStatistics/${userLogin}/${cardId}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => {
                return response as Statistics[];
            })
            .catch(handleError);
    }

    getStatisticsByUserAndDeck(userLogin: string, deckId: number): Promise<Statistics[]> {
        const URL = `${this.StatisticsUrl}/GetDeckStatistics/${userLogin}/${deckId}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => {
                return response as Statistics[];
            })
            .catch(handleError);
    }

    getStatisticsByUserAndCourse(userLogin: string, courseId: number): Promise<Statistics[]> {
        const URL = `${this.StatisticsUrl}/GetStatistics/${userLogin}/${courseId}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => {
                return response as Statistics[];
            })
            .catch(handleError);
    }
}
