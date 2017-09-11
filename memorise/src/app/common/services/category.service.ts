import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { CATEGORIES } from '../mocks/categories';
import { Category } from '../models/models';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
    getCategories(): Promise<Category[]> {
        return Promise.resolve(CATEGORIES);
    }
}