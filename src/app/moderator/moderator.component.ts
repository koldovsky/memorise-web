import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../pipes/filter.pipe';
import { SortingPipe } from '../pipes/sorting.pipe';
import { PaginationComponent } from '../pagination/pagination.component';

import { Course } from '../common/models/models';
import { CourseService } from '../common/services/course.service';
import { CreateCourseComponent } from '../catalog/courses/create-course/create-course.component';

import * as _ from 'underscore';

import { PagerService } from '../common/services/pager.service';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})

export class ModeratorComponent implements OnInit {
  searchableList: string[];
  courses: Course[];
  path: string[] = ['Name'];
  order = 1;
  whichButtonIsClicked = 'categories';
  pager: any = {};
  pagedItems: any[];
  damn: number[];

  constructor(
    private courseService: CourseService,
    private pagerService: PagerService
  ) {
    this.searchableList = ['Name'];
  }

  ngOnInit() {
    this.courseService.getCourses()
      .then(courses => {this.courses = courses; 
        this.setPage(1); this.damn = _.range(1, this.courses.length + 1); });
      }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.courses.length, page);
    this.pagedItems = this.courses.slice(this.pager.startIndex, this.pager.endIndex + 1);
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

  onBtnInfoClick(btnInfoLinking: string){
    this.courseService.btnInfoLinking = btnInfoLinking;
  }
}
