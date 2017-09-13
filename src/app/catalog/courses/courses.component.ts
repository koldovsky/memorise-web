import { Component, OnInit } from '@angular/core';
import { Course } from '../../common/models/models';
import { CourseService } from '../../common/services/course.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
    constructor(private courseService: CourseService) {
    }
    courses: Course[];

    ngOnInit(): void {
        this.courseService.getCourses()
            .then(courses => this.courses = courses);
    }
}
