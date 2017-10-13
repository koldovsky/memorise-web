import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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

    createCourse(course: Course):Promise<Course>{
        return this.http.post(this.courseModeratorUrl+"CreateCourse",course)
        .toPromise()
        .then(response => response as Course)
        .catch(handleError);
        
    }

    deleteCourse(id: number){
       return this.http.delete(this.courseModeratorUrl+"DeleteCourse/"+id);
    }

    checkIfCourseExists(courseName: string): Promise<Course> {
         return this.http.get(this.courseModeratorUrl+"FindCourseByName/"+courseName)
            .toPromise()
            .then(response => response as Course)
            .catch(handleError);
    }
}
