import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../../common/models/models';

import { CategoryService } from '../../common/services/category.service';
import { regexExpression } from '../../common/helpers/regexExpression';
import { errorMessages } from '../../common/helpers/errorMessages';

@Component({
    selector: 'edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})

export class EditCategoryComponent implements OnInit {

    regex;
    error;
    categories: Category[];
    category: Category;
    isLoadedCategories = false;

    constructor(
        private categoryService: CategoryService) {
    }

    ngOnInit() {
        // this.regex = regexExpression;
        // this.error = errorMessages;
        // this.categoryService.getCategoryByName('.Net')
        //     .then(categories => this.categories = categories);
    }

    onSubmit() {
        // this.categoryService.updateCategory(this.category)
        //     .subscribe(response => {
        //         console.log(response);
        //     },
        //     (err) => console.log(err)
        //     );
    }
}
