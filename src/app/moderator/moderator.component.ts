import { Component, OnInit } from '@angular/core';

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
  
  whichButtonIsClicked:string = "categories";
  isActive: boolean = false;

  constructor(private courseService: CourseService,
    private auth: AuthService) { }

  ngOnInit() {
   
  }
  onClick(event){
     let clickedButton = event.target;
     this.whichButtonIsClicked = clickedButton.id;
  }
  
}


  

