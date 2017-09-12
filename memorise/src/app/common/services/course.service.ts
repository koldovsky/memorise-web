import { Injectable } from "@angular/core";

import { COURSES } from "../mocks/courses";
import { Course } from "../models/models";
import { Http } from "@angular/http";
import { handleError } from "../functions/functions";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
        private coursesUrl = 'http://localhost:1010/courses';
    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(handleError);
    }
}
