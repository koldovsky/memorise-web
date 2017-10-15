import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Category, Course } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:37271/Catalog/GetCategories';
    private categoryModeratorUrl='http://localhost:37271/Moderator/'

    constructor(private http: HttpClient) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoryUrl)
            .toPromise()
            .then(response => response as Category[])
            .catch(handleError);
    }

    getCoursesByCategory(categoryName: string): Promise<Course[]> {
        const URL = `http://localhost:37271/Catalog/GetCoursesByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course[])
            .catch(handleError);
    }

    getDecksByCategory(categoryName: string): Promise<Course[]> {
        const URL = `http://localhost:37271/Catalog/GetDecksByCategory/${categoryName}`;

        return this.http.get(URL)
            .toPromise()
            .then(response => response as Course[])
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
