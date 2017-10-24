import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Statistics, Course, Deck, SubscriptionStatistics } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class StatisticsService {
    private StatisticsUrl = 'http://localhost:37271/Statistics';

    constructor(private http: HttpClient) { }

    getStatisticsByUser(userLogin: string): Observable<Statistics[]> {
        const URL = `${this.StatisticsUrl}/GetStatistics/${userLogin}`;

        return this.http.get(URL)
            .map(response => response as Statistics[])
            .catch(handleError);
    }

    getStatisticsByUserAndCard(userLogin: string, cardId: number): Observable<Statistics> {
        const URL = `${this.StatisticsUrl}/GetStatistics/${userLogin}/${cardId}`;

        return this.http.get(URL)
            .map(response => response as Statistics)
            .catch(handleError);
    }

    getStatisticsByUserAndDeck(userLogin: string, deckId: number): Observable<Statistics[]> {
        const URL = `${this.StatisticsUrl}/GetDeckStatistics/${userLogin}/${deckId}`;

        return this.http.get(URL)
            .map(response => response as Statistics[])
            .catch(handleError);
    }

    getStatisticsByUserAndCourse(userLogin: string, courseId: number): Observable<Statistics[]> {
        const URL = `${this.StatisticsUrl}/GetCourseStatistics/${userLogin}/${courseId}`;

        return this.http.get(URL)
            .map(response => response as Statistics[])
            .catch(handleError);
    }

    createStatisticsForCourse(statistics: SubscriptionStatistics): Observable<Statistics[]> {
        const URL = `${this.StatisticsUrl}/CreateCourseStatistics`;

        return this.http.post(URL, statistics)
            .map(response => response as Statistics[]);
    }

    createStatisticsForDeck(statistics: SubscriptionStatistics): Observable<Statistics[]> {
        const URL = `${this.StatisticsUrl}/CreateDeckStatistics`;

        return this.http.post(URL, statistics)
            .map(response => response as Statistics[]);
    }

    deleteStatistics(statisticsId: number): Observable<Statistics> {
        const URL = `${this.StatisticsUrl}/DeleteStatistics/${statisticsId}`;

        return this.http.delete(URL)
            .map(response => response as Statistics);
    }
}
