import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortingPipe } from '../../../pipes/sorting.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { Course, PageResponse } from '../../../common/models/models';
import { CourseService } from '../../../common/services/course.service';
import { CreateCourseComponent } from '../create-course/create-course.component';

@Component({
    selector: 'app-course-table',
    templateUrl: './course-table.component.html',
    styleUrls: ['./course-table.component.css']
})

export class CourseTableComponent implements OnInit {
    courses: Course[];
    arrayOfElementByPage = [5, 10, 'All'];
    totalCount: number;
    page = 0; pageSize = this.arrayOfElementByPage[0];
    pageResponse: PageResponse<Course>;
    sorted: boolean;
    searchText: string;
    currentCourse: Course;

    constructor(private courseService: CourseService
    ) {
        this.pageResponse = new PageResponse<Course>();
        this.pageResponse.items = [];
        this.currentCourse = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
    }

    ngOnInit() {
        this.sortTable();
    }

    onNotify(index: number): void {
        this.courseService.getCoursesByPage(index + 1, +this.pageSize, this.sorted, this.searchText)
            .then(pageResponse => {
                this.courses = pageResponse.items;
                this.page = index;
                this.totalCount = pageResponse.totalCount;
            });
    }

    onNext(): void {
        this.onNotify(this.page + 1);
    }

    onPrev(): void {
        this.onNotify(this.page - 1);
    }

    sortTable() {
        if (this.sorted === false) {
            this.sorted = true;
        } else {
            this.sorted = false;
        }
        this.onNotify(this.page);
        return this.sorted;
    }

    onChange(event: any) {
        this.onNotify(0);
    }

    onCourseAdded(newCourse: Course): void {
        this.courses.pop();
        this.courses.unshift(newCourse);
    }

    onDelete(course: Course): void {
        this.currentCourse = course;
    }

    confirmDelete(): void {
        this.courseService.deleteCourse(this.currentCourse.Id)
            .subscribe(() => {
                this.courses = this.courses.filter(x => x.Id !== this.currentCourse.Id);
            },
            (err) => console.log(err)
            );
    }

    onBtnInfoClick(btnInfoLinking: string) {
        this.courseService.btnInfoLinking = btnInfoLinking;
    }

    onSelectFilter(numberFilter: any): void {
        if (numberFilter === 'All') {
            numberFilter = 0;
        }
        this.pageSize = numberFilter;
        this.onNotify(0);
    }
}