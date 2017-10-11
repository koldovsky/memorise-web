import { Component, OnInit } from '@angular/core';

import { Course } from '../common/models/models';
import { CourseService } from '../common/services/course.service';

import * as _ from 'underscore';

import { PagerService } from '../common/services/pager.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {

    courses: Course[];
    pager: any = {};
    pagedItems: any[];
    damn: number[];
    isLoaded : boolean = false;

    constructor(private courseService: CourseService,
        private pagerService: PagerService) { }

    ngOnInit() {
        this.courseService.getCourses()
            .then(courses => { this.courses = courses; this.setPage(1); this.damn = _.range(1, this.courses.length + 1); });
        this.isLoaded = true;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
          return;
        }
        this.pager = this.pagerService.getPager(this.courses.length, page);
        this.pagedItems = this.courses.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }
}
