import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CourseService } from '../../common/services/course.service';
import { DeckService } from '../../common/services/deck.service';
import { CategoryService } from '../../common/services/category.service';
import { UserSubscriptionsService } from '../../common/services/user-subscriptions.service';
import { StatisticsService } from '../../common/services/statistics.service';
import { Course, Category, User } from '../../common/models/models';

import { Subscription } from 'rxjs/Subscription';

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
        private subscriptionsService: UserSubscriptionsService,
        private statisticsService: StatisticsService,
        private route: ActivatedRoute) {
    }

    currentUser: User;
    courses: Course[];
    subscription: Subscription;

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => {
                const category = params.get('category');
                return category === 'Any'
                    ? this.courseService.getCourses()
                    : this.categoryService.getCoursesByCategory(category);
            })
            .subscribe(courses => {
                courses.forEach(x => {
                    x.IsSubscribed = false;
                });
                this.courses = courses;
            });
    }

    // setCourseDecks(name: string) {
    //     this.deckService.getDecksByCourseName(name)
    //         .then(decks => this.courses
    //             .find(course => course.Linking === name).Decks = decks);
    // }

    subscribeToCourse(course: Course): void {
        if (this.currentUser === null) {
            const message = 'Please, sign in to subscribe to course';
            alert(message);
        } else {
            this.currentUser = {
                Login: 'user1'
            };
            this.subscriptionsService.subscribeToCourse(this.currentUser.Login, course.Id)
                .subscribe();
            this.statisticsService.createStatisticsForCourse(this.currentUser.Login, course.Id)
                .subscribe();
            course.IsSubscribed = true;
        }
    }

    unsubscribeFromCourse(course: Course): void {
        course.IsSubscribed = false;
    }
}
