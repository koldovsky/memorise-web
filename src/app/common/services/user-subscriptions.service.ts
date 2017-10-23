import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { User, Course, Deck, CourseSubscription, DeckSubscription } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UserSubscriptionsService {
    private SubscriptionsUrl = 'http://localhost:37271/Subscriptions';

    constructor(private http: HttpClient) { }

    getCourseSubscriptions(userName: string): Observable<CourseSubscription[]> {
        const URL = `${this.SubscriptionsUrl}/GetCourseSubscriptions/${userName}`;

        return this.http.get(URL)
            .map(response => response as CourseSubscription[]);
    }

    getDeckSubscriptions(userName: string): Observable<DeckSubscription[]> {
        const URL = `${this.SubscriptionsUrl}/GetDeckSubscriptions/${userName}`;

        return this.http.get(URL)
            .map(response => response as DeckSubscription[]);
    }

    getSubscribedCourses(userName: string): Observable<Course[]> {
        const URL = `${this.SubscriptionsUrl}/GetSubscribedCourses/${userName}`;
        return this.http.get(URL)
            .map(response => response as Course[]);
    }

    getSubscribedDecks(userName: string): Observable<Deck[]> {
        const URL = `${this.SubscriptionsUrl}/GetSubscribedDecks/${userName}`;

        return this.http.get(URL)
            .map(response => response as Deck[]);
    }

    subscribeToCourse(subscription: CourseSubscription): Observable<CourseSubscription> {
        const URL = `${this.SubscriptionsUrl}/CreateCourseSubscription`;

        return this.http.post(URL, subscription)
            .map(response => response as CourseSubscription);
    }

    subscribeToDeck(subscription: DeckSubscription): Observable<DeckSubscription> {
        const URL = `${this.SubscriptionsUrl}/CreateDeckSubscription`;

        return this.http.post(URL, subscription)
            .map(response => response as DeckSubscription);
    }

    unsubscribeFromCourse(subscriptionId: number): Observable<CourseSubscription> {
        const URL = `${this.SubscriptionsUrl}/DeleteCourseSubscription/${subscriptionId}`;

        return this.http.delete(URL)
        .map(response => response as CourseSubscription);
    }

    unsubscribeFromDeck(subscriptionId: number): Observable<DeckSubscription> {
        const URL = `${this.SubscriptionsUrl}/DeleteDeckSubscription/${subscriptionId}`;

        return this.http.delete(URL)
            .map(response => response as DeckSubscription);
    }
}
