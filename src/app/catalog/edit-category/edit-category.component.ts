import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../../common/models/models';

import { CategoryService } from '../../common/services/category.service';

@Component({
    selector: 'edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})

export class EditCategoryComponent implements OnInit {

    category: Category;
    isLoadedCategories = false;

    constructor(
        private categoryService: CategoryService) {
    }

    ngOnInit() {
        // this.categoryService.getCategoryByName(this.categoryService.btnInfoLinking)
        //     .subscribe(response => this.category = response as Category);
    }

    // onSubmit() {
    //     this.categoryService.updateCategory(this.category)
    //         .subscribe(response => {
    //             console.log(response);
    //         },
    //         (err) => console.log(err)
    //         );
    // }
}
