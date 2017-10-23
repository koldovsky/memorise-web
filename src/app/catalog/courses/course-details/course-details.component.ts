import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


import 'rxjs/add/operator/switchMap';

import { CourseService } from '../../../common/services/course.service';
import { Course, CourseSubscription } from '../../../common/models/models';
import { AuthService } from '../../../common/services/auth.service';
import { UserSubscriptionsService } from '../../../common/services/user-subscriptions.service';
import { StatisticsService } from '../../../common/services/statistics.service';
import { handleError } from '../../../common/functions/functions';

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {
    constructor(
        private courseService: CourseService,
        private authService: AuthService,
        private subscriptionsService: UserSubscriptionsService,
        private statisticsService: StatisticsService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    course: Course;
    currentUserLogin: string;
    subscription: CourseSubscription;

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.courseService
                .getCourse(params.get('name')))
            .subscribe(course => {
                this.course = course;
                if (this.authService.checkIfIsAuthorized()) {
                    this.currentUserLogin = this.authService.getCurrentUserLogin();
                    this.subscriptionsService.getCourseSubscriptions(this.currentUserLogin)
                        .subscribe(subscriptions => {
                            this.subscription = subscriptions
                                .find(x => x.CourseId === course.Id);
                            this.course.IsSubscribed = this.subscription
                                ? true
                                : false;
                        });
                }
            });
    }

    subscribeToCourse(): void {
        this.subscription = {
            Rating: -1,
            UserLogin: this.currentUserLogin,
            CourseId: this.course.Id
        };
        this.subscriptionsService.subscribeToCourse(this.subscription)
            .subscribe(
            x => {
                this.subscription = x;
                this.course.IsSubscribed = true;
                this.createCourseStatistics();
            },
            err => handleError);
    }

    unsubscribeFromCourse(): void {
        if (this.subscription) {
            this.subscriptionsService.unsubscribeFromCourse(this.subscription.Id)
                .subscribe(
                x => {
                    this.course.IsSubscribed = false;
                    this.subscription = null;
                    this.deleteCourseStatistics();
                },
                err => handleError
                );
        }
    }

    createCourseStatistics(): void {
        const subscriptionStatistics = {
            UserLogin: this.currentUserLogin,
            ItemId: this.course.Id
        };
        this.statisticsService
            .createStatisticsForCourse(subscriptionStatistics)
            .subscribe();
    }

    deleteCourseStatistics(): void {
        this.statisticsService
            .getStatisticsByUserAndCourse(this.currentUserLogin, this.course.Id)
            .subscribe(
                statistics => {
                statistics.forEach(x => {
                    this.statisticsService.deleteStatistics(x.Id).subscribe();
                },
            err => handleError);
            });
    }

    goBack(): void {
        this.location.back();
    }
}
