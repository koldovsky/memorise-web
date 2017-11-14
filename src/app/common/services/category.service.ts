import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Category, Course, Deck, PageResponse, SearchDataModel } from '../models/models';
import { handleError } from '../functions/functions';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoryService {

    btnInfoLinking = '';

    constructor(private http: HttpClient) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(`${environment.catalogUrl}/GetCategories`)
            .toPromise()
            .then(response => response as Category[])
            .catch(handleError);
    }

    getCategoriesByPage(page: number, pageSize: number, sorted: boolean, search: string): Promise<PageResponse<Category>> {
        const postData = new SearchDataModel;
        postData.page = page; postData.pageSize = pageSize;
        postData.searchString = search; postData.sort = sorted;
        const url = `${environment.catalogUrl}/GetCategoriesByPage`;
        return this.http.post(url, postData)
            .toPromise()
            .then(response => response as PageResponse<Category>)
            .catch(handleError);
    }

    getCoursesByCategory(categoryName: string): Promise<Course[]> {
        const URL = `${environment.catalogUrl}/GetCoursesByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getDecksByCategory(categoryName: string): Promise<Deck[]> {
        const URL = `${environment.catalogUrl}/GetDecksByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    createCategory(category: Category): Observable<Object> {
        return this.http.post(`${environment.moderationUrl}/CreateCategory`, category);
    }

    updateCategory(category: Category) {
       return this.http.put(`${environment.moderationUrl}/UpdateCategory`, category);
     }

    deleteCategory(id: number) {
        return this.http.delete(`${environment.moderationUrl}/DeleteCategory/${id}`);
    }

    checkIfCategoryExists(categoryName: string): Observable<Object> {
        return this.http.get(`${environment.moderationUrl}/FindCategoryByName/${btoa(categoryName)}`);
    }

    getCategoryByLinking(linking: string): Observable<Object> {
        return this.http.get(`${environment.moderationUrl}/FindCategoryByLinking/${linking}`);
    }
}
