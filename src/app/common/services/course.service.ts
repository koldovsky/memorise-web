import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { COURSES } from '../mocks/courses';
import { Course } from '../models/models';
import { handleError } from '../functions/functions';

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
            .then(response => response.json() as Course)
            .catch(handleError);
    }
}
