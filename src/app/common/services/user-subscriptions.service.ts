import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { User, Course, Deck } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UserSubscriptionsService {
    private SubscriptionsUrl = 'http://localhost:37271/UserSubscriptions';
    private StatisticsUrl = 'http://localhost:37271/Statistics';

    constructor(private http: HttpClient) { }

    getSubscribedCourses(userName: string): Observable<Course[]> {
        const URL = `${this.SubscriptionsUrl}/GetSubscribedCourses/${userName}`;
        return this.http.get(URL)
            .map(response => response as Course[])
            .catch(handleError);
    }

    getSubscribedDecks(userName: string): Observable<Deck[]> {
        const URL = `${this.SubscriptionsUrl}/GetSubscribedDecks/${userName}`;

        return this.http.get(URL)
            .map(response => response as User)
            .catch(handleError);
    }

    subscribeToCourse(userName: string, courseId: number): Observable<Response> {
        const URL = `${this.StatisticsUrl}/CreateCourseSubsription/${userName}/${courseId}`;

        return this.http.post(URL, null).catch(handleError);
    }

    subscribeToDeck(userName: string, deckId: number): Observable<Response> {
        const URL = `${this.StatisticsUrl}/CreateDeckSubsription/${userName}/${deckId}`;

        return this.http.post(URL, null).catch(handleError);
    }
}
