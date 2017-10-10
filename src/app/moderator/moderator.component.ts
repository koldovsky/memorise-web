import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../catalog/courses/course-filter/course.pipe';
import { SortingPipe } from '../catalog/courses/course-filter/course-sort.pipe';

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
  displayedColumns = ['Position', 'Name', 'Description'];
  dataSource: CoursesDataSource;

  key = 0;

export class ModeratorComponent implements OnInit {
  searchableList: string[];
  courses: Course[];
  copyCourses: Course;
  path: string[] = ['Name'];
  order: number = 1;
  whichButtonIsClicked: string = "categories";
  isActive: boolean = false; 
 
  constructor(private courseService: CourseService,
    private dialog: MatDialog,
    private auth: AuthService,
  ) {
    this.searchableList = ['Name'];
  }

  ngOnInit() {
    this.courseService.getCourses()
      .then(courses => this.courses = courses);
  }

  sortTable(prop: string) {
    this.path = prop.split('.')
    this.order = this.order * (-1); // change order
    return false; // do not reload
  }

  onClick(event) {
      let clickedButton = event.target;
      this.whichButtonIsClicked = clickedButton.id;
  }
  openCreateNewCourseDialog(): void {
    const dialogRef = this.dialog.open(CreateCourseComponent, {
      width: '400px',
      data: {
        action: 'Create new course',
        name: '',
        description: '',
      }
    });
  }


  

