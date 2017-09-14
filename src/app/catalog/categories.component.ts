import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../common/services/category.service';
import { Category } from '../common/models/models';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html'
})

export class CategoriesComponent implements OnInit {
    constructor(private categoryService: CategoryService) { }

    categories: Category[];

    ngOnInit(): void {
        this.categoryService.getCategories()
            .then(categories => this.categories = categories);
    }
}
