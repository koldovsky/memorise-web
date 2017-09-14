import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { CourseService } from '../../common/services/course.service';
import { Course } from '../../common/models/models';


@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {
    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    course: Course;

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.courseService.getCourse(decodeURIComponent(params.get('name'))))
            .subscribe(course => {
                this.course = course;
                console.log(this.course);
            });
    }
}
