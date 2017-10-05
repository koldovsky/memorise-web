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
 // number: NumberItem;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().then(courses => {
      this.addPosition(courses);
      this.dataSource = new CoursesDataSource(courses);
      // this.numbers = [];
      // for ( let i = 0; i < courses.length; i++ ) {
      //   // this.number = new NumberItem();
      //   // this.number.Value = i + 1;
      //   this.numbers.push(i);
      //   console.log(this.numbers);
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
