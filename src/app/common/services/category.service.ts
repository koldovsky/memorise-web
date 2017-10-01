import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { Category } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class CategoryService {
    private categoryUrl = 'http://localhost:37271/Catalog/GetCategories';

    constructor(private http: HttpClient) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(this.categoryUrl)
            .toPromise()
            .then(response => response as Category[])
            .catch(handleError);
    }
}
