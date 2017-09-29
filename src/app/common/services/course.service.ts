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

    constructor(private http: HttpClient) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getCourse(name: string): Promise<Course> {
        const URL = this.courseUrl + '/' + name;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course)
            .catch(handleError);
    }
}
