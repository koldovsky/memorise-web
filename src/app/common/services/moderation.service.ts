import { Injectable } from '@angular/core';
import { Course } from '../models/models';

import { CourseService } from '../../common/services/course.service';

@Injectable()
export class ModerationService{
    whichButtonIsClicked = "categories";
    courses:Course[];
    constructor(
        private courseService: CourseService
    ){}
    
    getCourses():void{
        this.courseService.getCourses().
        then(response=>this.courses=response);
    }
}