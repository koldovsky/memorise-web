import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortingPipe } from '../pipes/sorting.pipe';

import { Course } from '../common/models/models';
import { CourseService } from '../common/services/course.service';
import { CreateCourseComponent } from '../catalog/courses/create-course/create-course.component'

import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})

export class ModeratorComponent implements OnInit {
  searchableList: string[];
  courses: Course[];
  copyCourses: Course;
  path: string[] = ['Name'];
  order = 1;
  whichButtonIsClicked = 'categories';
  isActive = false;

  constructor(private courseService: CourseService,
    private auth: AuthService,
  ) {
    this.searchableList = ['Name'];
  }

  ngOnInit() {
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

  sortTable(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1);
    return false;
  }

  onClick(event) {
      const clickedButton = event.target;
      this.whichButtonIsClicked = clickedButton.id;
  }
  }
