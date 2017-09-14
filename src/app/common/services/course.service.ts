import { Injectable } from '@angular/core';

import { COURSES } from '../mocks/courses';
import { Course } from '../models/models';
import { Http } from '@angular/http';
import { handleError } from '../functions/functions';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
        private coursesUrl = 'http://localhost:37271/Catalog/GetCourses';
        private courseUrl = 'http://localhost:37271/Catalog/GetCourse';

    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(handleError);
    }

    getCourse(name: string): Promise<Course> {
        const URL = this.courseUrl + '/' + name;
        return this.http.get(URL)
            .toPromise()
            .then(response => {
                return response.json() as Course;
            })
            .catch(handleError);
        // return this.getCourses()
        //     .then(courses => {
        //         console.log(courses.find(course => course.Name === name));
        //         return courses.find(course => course.Name === name) as Course;
        //     });
    }
}
