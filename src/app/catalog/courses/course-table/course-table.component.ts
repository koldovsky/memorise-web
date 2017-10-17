import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortingPipe } from '../../../pipes/sorting.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';
//import { ModerationService} from '../../../common/services/moderation.service';

import { Course, PageResponse } from '../../../common/models/models';
import { CourseService } from '../../../common/services/course.service';
import { CreateCourseComponent} from '../create-course/create-course.component';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-course-table',
    templateUrl: './course-table.component.html',
    styleUrls: ['./course-table.component.css']
})

export class CourseTableComponent implements OnInit {

    courses: Course[];
    totalCount: number;
    page = 0; pageSize = 3;
    index = 1;
    pageResponse: PageResponse<Course>;
    sorted: boolean;
    currentCourse: Course;
    constructor(private courseService: CourseService
                //private moderationService: ModerationService
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
        // this.onNotify(this.page);
        this.courseService.getCourses()
            .then(courses => this.totalCount = courses.length);
    }

    onNotify(index: number): void {
        this.courseService.getCoursesByPage(index + 1, this.pageSize, this.sorted)
            .then(courses => {
                this.pageResponse = courses;
                this.page = index;
            });
    }

    onNext(): void {
        this.onNotify(this.page + this.index);
    }

    onPrev(): void {
        this.onNotify(this.page - this.index);
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

    onBtnInfoClick(btnInfoLinking: string) {
        this.courseService.btnInfoLinking = btnInfoLinking;
      }

    onCourseAdded(newCourse:Course):void{
        this.pageResponse.items.pop();
        this.pageResponse.items.unshift(newCourse);
    }
    onDelete(course: Course):void{
        this.currentCourse = course;
    }
    confirmDelete():void{
        this.courseService.deleteCourse(this.currentCourse.Id)
        .subscribe(()=>{
        this.pageResponse.items = this.pageResponse.items.filter(x=>x.Id!==this.currentCourse.Id); 
        },
        (err)=>console.log(err)
        );
    }
}