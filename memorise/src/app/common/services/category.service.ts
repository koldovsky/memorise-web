import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { CATEGORIES } from '../mocks/categories';
import { Category } from '../models/models';

import 'rxjs/add/operator/toPromise';
import { handleError } from "../functions/functions";

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:37271/Catalog/GetAllCategories';
    constructor(private http: Http) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoryUrl)
            .toPromise()
            .then(response => response.json().data as Category[])
            .catch(handleError);
    }
}
