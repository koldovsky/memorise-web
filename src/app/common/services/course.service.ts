import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { COURSES } from '../mocks/courses';
import { Course, PageResponse, SearchDataModel } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CourseService {
    private coursesUrl = 'http://localhost:37271/Catalog/GetCourses';
    private coursesPageUrl = 'http://localhost:37271/Catalog/GetCoursesByPage';
    private courseUrl = 'http://localhost:37271/Catalog/GetCourse';
    private courseModeratorUrl = 'http://localhost:37271/Moderator/';

    btnInfoLinking = '';

    constructor(private http: HttpClient) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getCoursesByPage(page: number, pageSize: number, sorted: boolean, search: string): Promise<PageResponse<Course>> {
        const postData = new SearchDataModel;
        postData.page = page; postData.pageSize = pageSize;
        postData.searchString = search; postData.sort = sorted;
        const url = this.coursesPageUrl;
        return this.http.post(url, postData)
            .toPromise()
            .then(response => response as PageResponse<Course>)
            .catch(handleError);
    }

    getCourse(link: string): Promise<Course> {
        const URL = this.courseUrl + '/' + link;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course)
            .catch(handleError);
    }

    createCourse(course: Course): Observable<Object> {
        course = this.encodeCourse(course);
        return this.http.post(`${this.courseModeratorUrl}CreateCourse`, course);
    }

    updateCourse(course: Course) {
        course = this.encodeCourse(course);
        return this.http.put(`${this.courseModeratorUrl}UpdateCourse`, course);
    }

    deleteCourse(id: number) {
        return this.http.delete(`${this.courseModeratorUrl}DeleteCourse/${id}`);
    }

    checkIfCourseExists(courseName: string): Observable<Object> {
        return this.http.get(`${this.courseModeratorUrl}FindCourseByName/${btoa(courseName)}`);
    }

    encodeCourse(course: Course): Course {
        course.Name = btoa(course.Name);
        course.Linking = btoa(course.Linking);
        course.Description = btoa(course.Description);
        return course;
    }
}
