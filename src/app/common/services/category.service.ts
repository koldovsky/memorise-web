import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Category, Course, Deck, PageResponse } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:37271/Catalog/GetCategories';
    private categoryPageUrl = 'http://localhost:37271/Catalog/GetCategoriesByPage';
    private categoryModeratorUrl = 'http://localhost:37271/Moderator/';

    constructor(private http: HttpClient) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoryUrl)
            .toPromise()
            .then(response => response as Category[])
            .catch(handleError);
    }

    getCategoriesByPage(page: number, pageSize: number, sorted: boolean): Promise<PageResponse<Category>> {
        const url = this.categoryPageUrl + '/' + page + '/' + pageSize + '/' + sorted;
        return this.http.get(url)
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

    createCategory(category: Category):Promise<Category>{
        return this.http.post(this.categoryModeratorUrl+"CreateCategory",category)
        .toPromise()
        .then(response => response as Category)
        .catch(handleError);
        
    }

    deleteCategory(id: number){
        return this.http.delete(this.categoryModeratorUrl+"DeleteCategory/"+id);
     }

    checkIfCategoryExists(categoryName: string): Promise<Category> {
         return this.http.get(this.categoryModeratorUrl+"FindCategoryByName/"+categoryName)
            .toPromise()
            .then(response => response as Category)
            .catch(handleError);
    }
}
