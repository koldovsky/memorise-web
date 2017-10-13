import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { SortingPipe } from '../../../pipes/sorting.pipe';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { ModerationService} from '../../../common/services/moderation.service';

import { Course } from '../../../common/models/models';
import { CourseService } from '../../../common/services/course.service';
import { CreateCourseComponent} from '../create-course/create-course.component';

import { Observable } from 'rxjs/Observable';

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
    currentCourse: Course;
    constructor(private courseService: CourseService,
                private moderationService: ModerationService
    ) {
        this.searchableList = ['Name'];
        
        this.currentCourse = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
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

    onBtnInfoClick(btnInfoLinking: string){
        this.courseService.btnInfoLinking = btnInfoLinking;
      }

    onCourseAdded(newCourse:Course):void{
        this.courses.pop();
        console.log(newCourse);
        this.courses.unshift(newCourse);
    }
    onDelete(course: Course):void{
        this.currentCourse = course;
    }
    confirmDelete():void{
        this.courseService.deleteCourse(this.currentCourse.Id)
        .subscribe(()=>{
        this.courses = this.courses.filter(x=>x.Id!==this.currentCourse.Id); 
        },
        (err)=>console.log(err)
        );
    }
}