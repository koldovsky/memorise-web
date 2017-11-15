import { Component, OnInit, NgModule } from '@angular/core';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { Course, PageResponse } from '../../../common/models/models';
import { CourseService } from '../../../common/services/course.service';
import { CreateCourseComponent } from '../create-course/create-course.component';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-course-table',
    templateUrl: './course-table.component.html',
    styleUrls: ['./course-table.component.css']
})

export class CourseTableComponent implements OnInit {

    courses: Course[];
    arrayOfElementByPage = [5, 10, 'All'];
    totalCount: number;
    page = 1; pageSize = this.arrayOfElementByPage[0];
    pageResponse: PageResponse<Course>;
    sorted: boolean;
    searchText: string;
    currentCourse: Course;
    isLoaded = true;

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
        this.isLoaded = false;
    }

    onNotify(index: number): void {
        this.courseService.getCoursesByPage(index, +this.pageSize, this.sorted, this.searchText)
            .then(pageResponse => {
                this.courses = pageResponse.items;
                this.page = index;
                this.totalCount = pageResponse.totalCount;
            });
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
        this.onNotify(1);
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
        this.onNotify(1);
    }

    dropDownElements() {
        if (this.pageSize === 0) {
            return 'Elements by Page: All';
        } else {
            return 'Elements by Page: ' + this.pageSize;
        }
    }
}
