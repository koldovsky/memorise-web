import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AuthService } from '../../../common/services/auth.service';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from '../../../common/services/statistics.service';
import { UserSubscriptionsService } from '../../../common/services/user-subscriptions.service';
import { Deck } from '../../../common/models/models';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

const STATISTICS = [
    {
        CardStatus: 0,
        UserLogin: 'user',
        CardId: 1
    },
    {
        CardStatus: 1,
        UserLogin: 'user',
        CardId: 2
    },
    {
        CardStatus: 2,
        UserLogin: 'user',
        CardId: 3
    }
];

const DECKS: Deck[] = [
    {
        Name: 'deck1',
        Linking: 'deck1',
        Price: 0
    },
    {
        Name: 'deck2',
        Linking: 'deck2',
        Price: 0
    },
    {
        Name: 'deck3',
        Linking: 'deck3',
        Price: 0
    }
];

const COURSES = [
    {
        Name: 'course1',
        Linking: 'course1',
        Price: 0,
        Description: '',
        Decks: DECKS
    },
    {
        Name: 'course2',
        Linking: 'course2',
        Price: 0,
        Description: '',
        Decks: DECKS
    },
    {
        Name: 'course3',
        Linking: 'course3',
        Price: 0,
        Description: '',
        Decks: DECKS
    },
];

describe('StatisticsComponent', () => {
    let component: StatisticsComponent;
    let auth: AuthService;
    let subscriptions: UserSubscriptionsService;
    let statistics: StatisticsService;
    let fixture: ComponentFixture<StatisticsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [
                StatisticsComponent
            ],
            providers: [
                AuthService,
                StatisticsService,
                UserSubscriptionsService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StatisticsComponent);

        component = fixture.componentInstance;

        auth = TestBed.get(AuthService);
        statistics = TestBed.get(StatisticsService);
        subscriptions = TestBed.get(UserSubscriptionsService);

        component.dependency = 'Course';
        component.userLogin = 'user';
        component.subscriptionName = 'course1';

        spyOn(auth, 'getCurrentUserLogin').and.returnValue('user');
        spyOn(statistics, 'getStatisticsByUserAndCourse')
            .and.returnValue(Observable.of(STATISTICS));
        spyOn(statistics, 'getStatisticsByUserAndDeck')
            .and.returnValue(Observable.of(STATISTICS));
        spyOn(subscriptions, 'getSubscribedCourses')
            .and.returnValue(Observable.of(COURSES));

    }));

    it('OnInit test', () => {
        fixture.detectChanges();
        spyOn(component, 'setNamesInfo');
        spyOn(component, 'setStatisticsInfo');

        component.ngOnInit();

        expect(component.userLogin).toBe('user');
        expect(component.dependency).toBe('Course');
        expect(component.subscriptionName).toBeNull();
        expect(component.setNamesInfo).toHaveBeenCalled();
        expect(component.setStatisticsInfo).toHaveBeenCalled();
    });

    it('setNamesInfo test', () => {
        fixture.detectChanges();
        component.dependency = 'Course';

        component.setNamesInfo();

        expect(subscriptions.getSubscribedCourses).toHaveBeenCalled();
        expect(component.subscriptionsNames).toContain('course1');
    });

    it('calculateSuccessPercent test', () => {
        expect(component.calculateSuccessPercent(STATISTICS)).toBe('50');
    });

    it('calculateSuccessPercentZero test', () => {
        expect(component.calculateSuccessPercent([])).toBe('0');
    });

    it('calculatePassedPercent test', () => {
        expect(component.calculatePassedPercent(STATISTICS)).toBe('67');
    });

    it('calculatePassedPercentZero test', () => {
        expect(component.calculatePassedPercent([])).toBe('0');
    });

    it('setDecksStatisticsInfoTest', () => {
        fixture.detectChanges();
        component.dependency = 'Deck';
        component.subscriptionName = null;

        component.setDecksStatisticsInfo(DECKS);

        expect(statistics.getStatisticsByUserAndDeck)
            .toHaveBeenCalled();
        expect(component.statisticsInfo).toContain({
            name: 'deck1',
            successPercent: '50',
            passedPercent: '67'
        });
    });

    it('setCoursesStatisticsInfoTest', () => {
        fixture.detectChanges();
        component.dependency = 'Course';
        component.subscriptionName = null;

        component.setCoursesStatisticsInfo(COURSES);

        expect(statistics.getStatisticsByUserAndCourse)
            .toHaveBeenCalled();
        expect(component.statisticsInfo).toContain({
            name: 'course1',
            successPercent: '50',
            passedPercent: '67',
            containInfo: [
                {
                    name: 'deck1',
                    successPercent: '50',
                    passedPercent: '67'
                },
                {
                    name: 'deck2',
                    successPercent: '50',
                    passedPercent: '67'
                },
                {
                    name: 'deck3',
                    successPercent: '50',
                    passedPercent: '67'
                }
            ]
        });
    });
});
