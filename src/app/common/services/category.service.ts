import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Category, Course, Deck, PageResponse, SearchDataModel } from '../models/models';
import { handleError } from '../functions/functions';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:37271/Catalog/GetCategories';
    private categoryPageUrl = 'http://localhost:37271/Catalog/GetCategoriesByPage';
    private categoryModeratorUrl = 'http://localhost:37271/Moderator/';

    btnInfoLinking = '';

    constructor(private http: HttpClient) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoryUrl)
            .toPromise()
            .then(response => response as Category[])
            .catch(handleError);
    }

    getCategoriesByPage(page: number, pageSize: number, sorted: boolean, search: string): Promise<PageResponse<Category>> {
        const postData = new SearchDataModel;
        postData.page = page; postData.pageSize = pageSize;
        postData.searchString = search; postData.sort = sorted;
        const url = this.categoryPageUrl;
        return this.http.post(url, postData)
            .toPromise()
            .then(response => response as PageResponse<Category>)
            .catch(handleError);
    }

    getCoursesByCategory(categoryName: string): Promise<Course[]> {
        const URL = `http://localhost:37271/Catalog/GetCoursesByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getDecksByCategory(categoryName: string): Promise<Deck[]> {
        const URL = `http://localhost:37271/Catalog/GetDecksByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Deck[])
            .catch(handleError);
    }

    createCategory(category: Category): Observable<Object> {
        return this.http.post(`${this.categoryModeratorUrl}CreateCategory`, category);
    }

    updateCategory(category: Category) {
       return this.http.put(`${this.categoryModeratorUrl}UpdateCategory`, category);
     }

    deleteCategory(id: number) {
        return this.http.delete(`${this.categoryModeratorUrl}DeleteCategory/${id}`);
    }

    checkIfCategoryExists(categoryName: string): Observable<Object> {
        return this.http.get(`${this.categoryModeratorUrl}FindCategoryByName/${btoa(categoryName)}`);
    }

    getCategoryByLinking(linking: string): Observable<Object> {
        return this.http.get(`${this.categoryModeratorUrl}FindCategoryByLinking/${linking}`);
    }
}
