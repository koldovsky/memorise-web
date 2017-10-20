import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { User, Course, Deck, CourseSubscription, DeckSubscription } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UserSubscriptionsService {
    private SubscriptionsUrl = 'http://localhost:37271/UserSubscriptions';
    // private StatisticsUrl = 'http://localhost:37271/Statistics';

    constructor(private http: HttpClient) { }

    getCourseSubscriptions(userName: string): Observable<CourseSubscription[]> {
        const URL = `${this.SubscriptionsUrl}/GetCourseSubscriptions/${userName}`;

        return this.http.get(URL)
            .map(response => response as CourseSubscription[])
            .catch(handleError);
    }

    getDeckSubscriptions(userName: string): Observable<DeckSubscription[]> {
        const URL = `${this.SubscriptionsUrl}/GetDeckSubscriptions/${userName}`;

        return this.http.get(URL)
            .map(response => response as DeckSubscription[])
            .catch(handleError);
    }

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
        const URL = `${this.SubscriptionsUrl}/CreateCourseSubsription/${userName}/${courseId}`;

        return this.http.post(URL, null)
            .catch(handleError);
    }

    subscribeToDeck(userName: string, deckId: number): Observable<Response> {
        const URL = `${this.SubscriptionsUrl}/CreateDeckSubsription/${userName}/${deckId}`;

        return this.http.post(URL, null)
            .catch(handleError);
    }

    unsubscribeFromCourse(subscriptionId: number): Observable<Response> {
        const URL = `${this.SubscriptionsUrl}/DeleteCourseSubsription/${subscriptionId}`;

        return this.http.delete(URL)
            .catch(handleError);
    }

    unsubscribeFromDeck(subscriptionId: number): Observable<Response> {
        const URL = `${this.SubscriptionsUrl}/DeleteDeckSubsription/${subscriptionId}`;

        return this.http.delete(URL)
            .catch(handleError);
    }
}
