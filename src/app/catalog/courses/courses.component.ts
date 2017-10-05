import { Component, OnInit, OnDestroy } from '@angular/core';

import { CourseService } from '../../common/services/course.service';
import { DeckService } from '../../common/services/deck.service';
import { Course, Category } from '../../common/models/models';
import { MessageService } from '../../common/services/message.service';
import { CategoryService } from '../../common/services/category.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit, OnDestroy {
    constructor(private courseService: CourseService,
        private deckService: DeckService,
        private messageService: MessageService,
        private categoryService: CategoryService) {
    }

    courses: Course[];
    subscription: Subscription;

    ngOnInit(): void {
         if (this.messageService.temp) {
            const category = this.messageService.temp as Category;
            this.categoryService.getCoursesByCategory(category.Linking)
                .then(courses => this.courses = courses);
        } else {
            this.courseService.getCourses()
                .then(courses => this.courses = courses);
        }

        // this.courseService.getCourses()
        //     .then(courses => this.courses = courses);



        this.messageService.getMessage().subscribe(data => {
            if (data) {
                const category = data as Category;
                this.categoryService.getCoursesByCategory(category.Linking)
                    .then(courses => this.courses = courses);
            } else {
                this.courseService.getCourses()
                    .then(courses => this.courses = courses);
            }
        });
    }

    ngOnDestroy(): void {
    }

    getCourseDecks(name: string) {
        this.deckService.getDecksByCourseName(name)
            .then(decks => this.courses
                .find(course => course.Linking === name).Decks = decks);
    }
}
