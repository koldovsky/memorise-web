import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CourseService } from '../../common/services/course.service';
import { DeckService } from '../../common/services/deck.service';
import { CategoryService } from '../../common/services/category.service';
import { UserSubscriptionsService } from '../../common/services/user-subscriptions.service';
import { StatisticsService } from '../../common/services/statistics.service';
import { Course, Category, User, CourseSubscription } from '../../common/models/models';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../common/services/auth.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
    constructor(
        private courseService: CourseService,
        // private deckService: DeckService,
        private categoryService: CategoryService,
        private authService: AuthService,
        private subscriptionsService: UserSubscriptionsService,
        private statisticsService: StatisticsService,
        private route: ActivatedRoute) {
    }

    currentUserLogin: string;
    courses: Course[];
    subscriptions: CourseSubscription[];

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                const category = params.get('category');
                return category === 'Any'
                    ? this.courseService.getCourses()
                    : this.categoryService.getCoursesByCategory(category);
            }).subscribe(courses => {
                // courses.forEach(x => {
                //     x.IsSubscribed = false;
                // });
                this.courses = courses;
            });
        this.subscriptions = [];
        // if (this.authService.checkIfIsAuthorized()) {
        //     this.currentUserLogin = this.authService.getCurrentUserLogin();
        //     this.subscriptionsService.getCourseSubscriptions(this.currentUserLogin)
        //         .subscribe(subscriptions => {
        //             // this.subscriptions = subscriptions;
        //             subscriptions.forEach(x => {
        //                 if (x.CourseId)
        //             })
        //         });
        // }
    }

    checkIfIsSubscribed(course: Course): boolean {
        // if (this.authService.isAuthorized) {
            const subscription = this.subscriptions.find(x => x.CourseId === course.Id);
        // }
console.log(subscription);
        return subscription !== undefined ? true : false;
    }

    subscribeToCourse(course: Course): void {
        this.subscriptionsService.subscribeToCourse(this.currentUserLogin, course.Id)
            .subscribe();
        this.statisticsService.createStatisticsForCourse(this.currentUserLogin, course.Id)
            .subscribe();
        // course.IsSubscribed = true;
    }

    unsubscribeFromCourse(course: Course): void {
        const subscription = this.subscriptions.find(x => x.Id === course.Id);
        this.subscriptionsService.unsubscribeFromCourse(subscription.Id);
    }
}
