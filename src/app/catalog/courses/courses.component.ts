import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute, ParamMap } from '@angular/router';
=======
>>>>>>> ec8f12a4a9364d4b80d8e5353bff8774491473f0

import { CourseService } from '../../common/services/course.service';
import { DeckService } from '../../common/services/deck.service';
import { CategoryService } from '../../common/services/category.service';
import { Course, Category } from '../../common/models/models';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {
    constructor(
        private courseService: CourseService,
        private deckService: DeckService,
        private categoryService: CategoryService,
        private route: ActivatedRoute) {
    }

    courses: Course[];
    subscription: Subscription;

    ngOnInit(): void {
<<<<<<< HEAD
        this.route.paramMap
        .switchMap((params: ParamMap) => {
            const category = params.get('category');
            return category === 'Any'
            ? this.courseService.getCourses()
            : this.categoryService.getCoursesByCategory(category);
        })
        .subscribe(courses => {
            this.courses = courses;
=======
        if (this.messageService.temp) {
            const category = this.messageService.temp as Category;
            this.categoryService.getCoursesByCategory(category.Linking)
                .then(courses => this.courses = courses);
        } else {
            this.courseService.getCourses()
                .then(courses => this.courses = courses);
        }

        this.messageService.getMessage().subscribe(data => {
            if (data) {
                const category = data as Category;
                this.categoryService.getCoursesByCategory(category.Linking)
                    .then(courses => this.courses = courses);
            } else {
                this.courseService.getCourses()
                    .then(courses => this.courses = courses);
            }
>>>>>>> ec8f12a4a9364d4b80d8e5353bff8774491473f0
        });
    }

    getCourseDecks(name: string) {
        this.deckService.getDecksByCourseName(name)
            .then(decks => this.courses
                .find(course => course.Linking === name).Decks = decks);
    }
}
