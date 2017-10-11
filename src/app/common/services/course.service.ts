import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { COURSES } from '../mocks/courses';
import { Course } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CourseService {
    private coursesUrl = 'http://localhost:37271/Catalog/GetCourses';
    private courseUrl = 'http://localhost:37271/Catalog/GetCourse';
    private courseModeratorUrl='http://localhost:37271/Moderator/'
    
    btnInfoLinking: string = "";

    constructor(private http: HttpClient) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getCourse(link: string): Promise<Course> {
        const URL = this.courseUrl + '/' + link;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course)
            .catch(handleError);
    }

    createCourse(course: Course):void{
        this.http.post(this.courseModeratorUrl+"CreateCourse",course)
        .toPromise()
        .catch(handleError);
        
    }

    checkIfCourseExists(courseName: string): Promise<boolean>{
        return this.http.get(this.courseModeratorUrl+"CheckIfCourseExists/"+courseName)
        .toPromise()
        .then(r=>r as boolean)
        .catch(handleError);
        
        
    }
}
