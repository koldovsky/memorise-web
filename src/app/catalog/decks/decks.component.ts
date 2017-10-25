import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Deck, Category, DeckSubscription, Statistics } from '../../common/models/models';
import { DeckService } from '../../common/services/deck.service';
import { MessageService } from '../../common/services/message.service';
import { CategoryService } from '../../common/services/category.service';
import { AuthService } from '../../common/services/auth.service';
import { UserSubscriptionsService } from '../../common/services/user-subscriptions.service';
import { StatisticsService } from '../../common/services/statistics.service';
import { handleError } from '../../common/functions/functions';

@Component({
    selector: 'app-decks',
    templateUrl: './decks.component.html',
    styleUrls: ['./decks.component.css']
})

export class DecksComponent implements OnInit {
    constructor(
        private deckService: DeckService,
        private categoryService: CategoryService,
        private authService: AuthService,
        private subscriptionsService: UserSubscriptionsService,
        private statisticsService: StatisticsService,
        private route: ActivatedRoute) { }

    currentUserLogin: string;
    subscriptions: DeckSubscription[];
    statistics: Statistics[];
    decks: Deck[];

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                const category = params.get('category');
                return category === 'Any'
                    ? this.deckService.getDecks()
                    : this.categoryService.getDecksByCategory(category);
            }).subscribe(decks => {
                this.decks = decks;
                if (this.authService.checkIfIsAuthorized()) {
                    this.currentUserLogin = this.authService.getCurrentUserLogin();
                    this.subscriptionsService.getDeckSubscriptions(this.currentUserLogin)
                        .subscribe(subscriptions => {
                            this.subscriptions = subscriptions;
                            this.checkSubscriptions();
                        });
                }
            });
    }

    checkSubscriptions() {
        this.decks.forEach(deck => {
            deck.IsSubscribed = this.subscriptions
                .find(x => x.DeckId === deck.Id)
                ? true
                : false;
        });
    }

    subscribeToDeck(course: Deck): void {
        const subscription = {
            Rating: -1,
            UserLogin: this.currentUserLogin,
            DeckId: course.Id
        };
        this.subscriptionsService.subscribeToDeck(subscription)
            .subscribe(
            x => {
                this.subscriptions.push(x);
                course.IsSubscribed = true;
                this.createDeckStatistics(course);
            },
            err => handleError);
    }

    unsubscribeFromDeck(course: Deck): void {
        const subscription = this.subscriptions.find(x => x.DeckId === course.Id);
        if (subscription) {
            this.subscriptionsService.unsubscribeFromDeck(subscription.Id)
                .subscribe(
                x => {
                    course.IsSubscribed = false;
                    this.subscriptions = this.subscriptions.filter(s => s !== x);
                    this.deleteDeckStatistics(course);
                },
                err => handleError
                );
        }
    }

    createDeckStatistics(course: Deck): void {
        const subscriptionStatistics = {
            UserLogin: this.currentUserLogin,
            ItemId: course.Id
        };
        this.statisticsService
            .createStatisticsForDeck(subscriptionStatistics)
            .subscribe();
    }

    deleteDeckStatistics(course: Deck): void {
        this.statisticsService
            .getStatisticsByUserAndDeck(this.currentUserLogin, course.Id)
            .subscribe(statistics => {
                statistics.forEach(x => {
                    this.statisticsService.deleteStatistics(x.Id).subscribe();
                });
            });
    }
}
