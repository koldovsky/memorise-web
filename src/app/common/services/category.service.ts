import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Category, Course } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:37271/Catalog/GetCategories';

    constructor(private http: Http) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoryUrl)
            .toPromise()
            .then(response => response.json() as Category[])
            .catch(handleError);
    }

    getCoursesByCategory(categoryName: string): Promise<Course[]> {
        const URL = `http://localhost:37271/Catalog/GetCoursesByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(handleError);
    }

    getDecksByCategory(categoryName: string): Promise<Course[]> {
        const URL = `http://localhost:37271/Catalog/GetDecksByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response.json() as Course[])
            .catch(handleError);
    }
}
