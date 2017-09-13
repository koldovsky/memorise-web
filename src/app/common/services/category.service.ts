import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Category } from '../models/models';

import 'rxjs/add/operator/toPromise';
import { handleError } from '../functions/functions';

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:37271/Catalog/GetCategories';
    constructor(private http: Http) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoryUrl)
            .toPromise()
            .then(response => {
                 console.log(response);
                console.log(response.json());
                return response.json() as Category[]; })
            .catch(handleError);
    }
}
