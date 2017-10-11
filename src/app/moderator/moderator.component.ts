import { Component, OnInit, NgModule } from '@angular/core';

import { Course } from '../common/models/models';
import { CourseService } from '../common/services/course.service';
import { CreateCourseComponent } from '../catalog/courses/create-course/create-course.component';
import { CourseTableComponent } from '../catalog/courses/course-table/course-table.component';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})

export class ModeratorComponent implements OnInit {
  courses: Course[];
  whichButtonIsClicked = 'categories';

  constructor(private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseService.getCourses()
      .then(courses => {this.courses = courses; });
      }

  onClick(event) {
    const clickedButton = event.target;
    this.whichButtonIsClicked = clickedButton.id;
  }

}
