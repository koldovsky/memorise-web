import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { User, Course, Deck } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UserSubscriptionsService {
    private SubscriptionsUrl = 'http://localhost:37271/UserSubscriptions';
    private StatisticsUrl = 'http://localhost:37271/Statistics';

    constructor(private http: HttpClient) { }

    getUserCourses(userLogin: string): Promise<Course[]> {
        const URL = `${this.SubscriptionsUrl}/GetUserCourses/${userLogin}`;
        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getUserDecks(userLogin: string): Promise<Deck[]> {
        const URL = `${this.SubscriptionsUrl}/GetUserDecks${userLogin}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as User)
            .catch(handleError);
    }

    createCourseSubscription(userLogin: string, courseId: number) {
        const URL = `${this.StatisticsUrl}/CreateCourseSubsription/${userLogin}/${courseId}`;

        this.http.post(URL, null, null).catch(handleError);
    }

    createDeckSubscription(userLogin: string, deckId: number) {
        const URL = `${this.StatisticsUrl}/CreateDeckSubsription/${userLogin}/${deckId}`;

        this.http.post(URL, null, null).catch(handleError);
    }
}
