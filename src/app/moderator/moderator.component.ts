import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Course } from '../common/models/models';
import { CourseService } from '../common/services/course.service';
import { MatDialog } from '@angular/material';
import { CreateCourseComponent} from '../catalog/courses/create-course/create-course.component'

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

  numbers: number[];
 
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().then(courses => {
      this.addPosition(courses);
      this.dataSource = new CoursesDataSource(courses);
      }
    );
  }
  addPosition(courses: Course[]){
    for ( let i = 0; i < courses.length; i++ ) {
      courses[i].Position = i + 1;
    }

  }
}

export class CoursesDataSource extends DataSource<Course> {
  constructor(private courses: Course[]) {
    super();
  }

  connect(): Observable<Course[]> {
    return Observable.of(this.courses);
  }

  disconnect() { }
}

class NumberItem {
  public Value: number;
}
export class ModeratorComponent {
  constructor(private dialog: MatDialog,
    private auth:AuthService) { }

  openCreateNewCourseDialog(): void {
    const dialogRef = this.dialog.open(CreateCourseComponent, {
      width: '400px',
      data:
      {
        action:'Create new course',
        name: '',
        description: '',
      }
    });

   
  }
}
