import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Category } from '../../common/models/models';

import { AuthService } from '../../common/services/auth.service';
import { CategoryService } from '../../common/services/category.service';
import { handleError } from '../../common/functions/functions';
import { regexExpression } from '../../common/helpers/regexExpression';
import { errorMessages } from '../../common/helpers/errorMessages';

@Component({
    selector: 'create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})

export class CreateCategoryComponent implements OnInit {

    regex;
    error;
    category: Category;
    isUnique = false;
    afterCheck = false;
    submitMessage = '';

    @Output()
    afterCategoryAdded: EventEmitter<Category> = new EventEmitter<Category>();

    constructor(
        private authService: AuthService,
        private categoryService: CategoryService
    ) {
        this.category = {
            Name: '',
            Linking: ''
        };
    }

    ngOnInit(): void {
        this.regex = regexExpression;
        this.error = errorMessages;
    }

    onSubmit(form: NgForm) {
        if (this.isUnique) {
            this.createCategory();
            form.reset();
            this.isUnique = false;
        } else {
            this.categoryService.checkIfCategoryExists(this.category.Name)
                .subscribe(response => {
                    const result = response as Category;
                    if (result.Name === 'unique') {
                        this.isUnique = true;
                        this.createLinking();
                        this.createCategory();
                        form.reset();
                        this.isUnique = false;
                    } else {
                        this.isUnique = false;
                        this.category.Linking = '';
                        this.afterCheck = true;
                    }
                },
                err => (handleError)
                );
        }
    }

    createCategory() {
        this.categoryService.createCategory(this.category)
            .subscribe(category => {
                this.submitMessage = 'Category was created successfully';
                this.showSnackbar();
                this.afterCategoryAdded.emit(category as Category);
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

    checkName() {
        this.categoryService.checkIfCategoryExists(this.category.Name)
            .subscribe(response => {
                const result = response as Category;
                if (result.Name === 'unique') {
                    this.isUnique = true;
                    this.createLinking();
                } else {
                    this.isUnique = false;
                    this.category.Linking = '';
                    this.afterCheck = true;
                }
            },
            err => (handleError)
            );
    }

    createLinking(): void {
        this.category.Linking = this.category.Name.replace(this.regex.LINKING, '');
    }
}
