import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
        this.route.paramMap
        .switchMap((params: ParamMap) => {
            const category = params.get('category');
            return category === 'Any'
            ? this.courseService.getCourses()
            : this.categoryService.getCoursesByCategory(category);
        })
        .subscribe(courses => {
            this.courses = courses;
        });
    }

    getCourseDecks(name: string) {
        this.deckService.getDecksByCourseName(name)
            .then(decks => this.courses
                .find(course => course.Linking === name).Decks = decks);
    }
}
