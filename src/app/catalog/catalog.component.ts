import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../common/services/category.service';
import { Category } from '../common/models/models';
import { MessageService } from '../common/services/message.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
    constructor(private categoryService: CategoryService) { }

    categories: Category[];
    dependency: string;

    ngOnInit(): void {
        this.categoryService.getCategories()
            .then(categories => this.categories = categories);
    }
}
