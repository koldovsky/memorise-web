import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortingPipe } from '../../../pipes/sorting.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';

import { Course } from '../../../common/models/models';
import { CourseService } from '../../../common/services/course.service';

@Component({
    selector: 'app-course-table',
    templateUrl: './course-table.component.html',
    styleUrls: ['./course-table.component.css']
})

export class CourseTableComponent implements OnInit {

    searchableList: string[];
    courses: Course[];
    path: string[] = ['Name'];
    order = 1;

    constructor(private courseService: CourseService
    ) {
        this.searchableList = ['Name'];
    }

    ngOnInit() {
        this.courseService.getCourses()
            .then(courses => { this.courses = courses; });
    }

    sortTable(prop: string) {
        this.path = prop.split('.');
        this.order = this.order * (-1);
        return false;
    }
}
