import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Course, PageResponse, SearchDataModel } from '../models/models';
import { handleError } from '../functions/functions';
import { environment } from '../../../environments/environment';

@Injectable()
export class CourseService {

    btnInfoLinking = '';

    constructor(private http: HttpClient) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(`${environment.catalogUrl}/GetCourses`)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getCoursesByPage(page: number, pageSize: number, sorted: boolean, search: string): Promise<PageResponse<Course>> {
        const postData = new SearchDataModel;
        postData.page = page; postData.pageSize = pageSize;
        postData.searchString = search; postData.sort = sorted;
        const url = `${environment.catalogUrl}/GetCoursesByPage`;
        return this.http.post(url, postData)
            .toPromise()
            .then(response => response as PageResponse<Course>)
            .catch(handleError);
    }

    getCourse(link: string): Promise<Course> {
        const URL = `${environment.catalogUrl}/GetCourse/${link}`;
        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course)
            .catch(handleError);
    }

    createCourse(course: Course): Observable<Object> {
        return this.http.post(`${environment.moderationUrl}/CreateCourse`, course);
    }
    updateCourse(course: Course) {
        return this.http.put(`${environment.moderationUrl}/UpdateCourse`, course);
    }

    deleteCourse(id: number) {
        return this.http.delete(`${environment.moderationUrl}/DeleteCourse/${id}`);
    }

    checkIfCourseExists(courseName: string): Observable<Object> {
        return this.http.get(`${environment.moderationUrl}/FindCourseByName/${btoa(courseName)}`);
    }

}
