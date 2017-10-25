import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../../common/models/models';


import { CategoryService } from '../../common/services/category.service';
import { regexExpression } from '../../common/helpers/regexExpression';
import { errorMessages } from '../../common/helpers/errorMessages';
import { handleError } from '../../common/functions/functions';
import { ModerationService } from '../../common/services/moderation.service';

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
    categoryNameBeforeChanges: string;
    isLoadedCategory = false;
    isUnique = false;
    afterCheck = false;
    submitMessage = '';

    constructor(
        private categoryService: CategoryService,
        private moderationService: ModerationService) {
    }

    ngOnInit() {
        this.regex = regexExpression;
        this.error = errorMessages;
        this.categoryService.getCategoryByLinking(this.categoryService.btnInfoLinking)
            .subscribe(category => {
                this.category = category as Category;
                this.categoryNameBeforeChanges = (category as Category).Name;
                this.isLoadedCategory = true;
            },
            err => (handleError)
            );
    }

    onSubmit() {
        if (this.checkCategoryForChanges()) {
            this.checkNameAndUpdate();
        }
    }
    checkNameAndUpdate() {
        if (this.isUnique ) {
           this.updateCategory();
            this.isUnique = false;
        } else {
            this.categoryService.checkIfCategoryExists(this.category.Name)
                .subscribe(response => {
                    const result = response as Category;
                    if (result.Name === 'unique') {
                        this.isUnique = true;
                        this.createLinking();
                        this.updateCategory();
                        this.isUnique = false;
                    } else {
                        this.isUnique = false;
                        this.afterCheck = true;
                    }
                },
                err => (handleError)
                );
        }
    }
    updateCategory() {
        this.categoryService.updateCategory(this.category)
        .subscribe(category => {
            this.submitMessage = 'Category was updated successfully';
            this.showSnackbar();
            this.categoryNameBeforeChanges = (category as Category).Name;
            },
            err => {
                this.submitMessage = this.error.ERROR;
                this.showSnackbar();
            }
        );
    }
    showSnackbar() {
        const x = document.getElementById('snackbar')
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }
    checkCategoryForChanges(): boolean {
        if (this.category.Name !== this.categoryNameBeforeChanges) {
           return true;
        } else { return false; }
    }
    checkName() {
        this.categoryService.checkIfCategoryExists(this.category.Name)
            .subscribe(response => {
                const result = response as Category;
                if (result.Name === 'unique') {
                    this.isUnique = true;
                    this.createLinking();
                } else {
                    this.isUnique = false;
                    this.afterCheck = true;
                }
            },
            err => (handleError)
            );
    }
    createLinking(): void {
        this.category.Linking = this.category.Name.replace(this.regex.LINKING, '');
    }
    setWhichButtonIsClicked() {
        this.moderationService.whichButtonIsClicked = 'categories';
    }
}
