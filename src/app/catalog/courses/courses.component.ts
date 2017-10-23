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
import { handleError } from '../../common/functions/functions';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
    constructor(
        private courseService: CourseService,
        private categoryService: CategoryService,
        private authService: AuthService,
        private subscriptionsService: UserSubscriptionsService,
        private statisticsService: StatisticsService,
        private route: ActivatedRoute) { }

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
                this.courses = courses;
                if (this.authService.checkIfIsAuthorized()) {
                    this.currentUserLogin = this.authService.getCurrentUserLogin();
                    this.subscriptionsService.getCourseSubscriptions(this.currentUserLogin)
                        .subscribe(subscriptions => {
                            this.subscriptions = subscriptions;
                            this.checkSubscriptions();
                        });
                }
            });
    }

    checkSubscriptions() {
        this.courses.forEach(course => {
            course.IsSubscribed = this.subscriptions
                .find(x => x.CourseId === course.Id)
                ? true
                : false;
        });
    }

    subscribeToCourse(course: Course): void {
        const subscription = {
            Rating: -1,
            UserLogin: this.currentUserLogin,
            CourseId: course.Id
        };
        this.subscriptionsService.subscribeToCourse(subscription)
            .subscribe(
            x => {
                this.subscriptions.push(x);
                course.IsSubscribed = true;
                this.createCourseStatistics(course);
            },
            err => handleError);
    }

    unsubscribeFromCourse(course: Course): void {
        const subscription = this.subscriptions.find(x => x.CourseId === course.Id);
        if (subscription) {
            this.subscriptionsService.unsubscribeFromCourse(subscription.Id)
                .subscribe(
                x => {
                    course.IsSubscribed = false;
                    this.subscriptions = this.subscriptions.filter(s => s !== x);
                    this.deleteCourseStatistics(course);
                },
                err => handleError
                );
        }
    }

    createCourseStatistics(course: Course): void {
        const subscriptionStatistics = {
            UserLogin: this.currentUserLogin,
            ItemId: course.Id
        };
        this.statisticsService
            .createStatisticsForCourse(subscriptionStatistics)
            .subscribe();
    }

    deleteCourseStatistics(course: Course): void {
        this.statisticsService
            .getStatisticsByUserAndCourse(this.currentUserLogin, course.Id)
            .subscribe(statistics => {
                statistics.forEach(x => {
                    this.statisticsService.deleteStatistics(x.Id).subscribe();
                });
            });
    }
}
