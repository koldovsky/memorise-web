import { Injectable } from "@angular/core";

import { COURSES } from "../mocks/courses";
import { Course } from "../models/models";
import { Http } from "@angular/http";
import { handleError } from "../functions/functions";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
        private coursesUrl = 'http://localhost:37271/Catalog/GetCourses';
    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(handleError);
    }
}
