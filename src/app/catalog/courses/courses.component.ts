import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../common/services/course.service';
import { DeckService } from '../../common/services/deck.service';
import { Course } from '../../common/models/models';



@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
    constructor(private courseService: CourseService,
        private deckService: DeckService) {
    }

    courses: Course[];

    ngOnInit(): void {
        this.courseService.getCourses()
            .then(courses => this.courses = courses);
    }

    getCourseDecks(name: string) {
        this.deckService.getDecksByCourseName(name)
            .then(decks => this.courses
                .find(course => course.Name === name).Decks = decks);
    }
}
