import { Component, OnInit, NgModule } from '@angular/core';
import { PaginationComponent } from '../../pagination/pagination.component';

import { Category, PageResponse } from '../../common/models/models';
import { CategoryService } from '../../common/services/category.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-catalog-table',
    templateUrl: './catalog-table.component.html',
    styleUrls: ['./catalog-table.component.css']
})

export class CatalogTableComponent implements OnInit {
    categories: Category[];
    arrayOfElementByPage = [5, 10, 'All'];
    totalCount: number;
    page = 1; pageSize = this.arrayOfElementByPage[0];
    pageResponse: PageResponse<Category>;
    sorted: boolean;
    searchText: string;
    currentCategory: Category;
    isLoaded: boolean;

    constructor(private categoryService: CategoryService
    ) {
        this.pageResponse = new PageResponse<Category>();
        this.pageResponse.items = [];
        this.currentCategory = {
            Name: '',
            Linking: ''
        };
    }

    ngOnInit() {
        this.isLoaded = false;
        this.sortTable();
    }

    onNotify(index: number): void {
        this.categoryService.getCategoriesByPage(index, +this.pageSize, this.sorted, this.searchText)
            .then(pageResponse => {
                this.categories = pageResponse.items;
                this.page = index;
                this.totalCount = pageResponse.totalCount;
                this.isLoaded = true;
            });
    }

    sortTable() {
        if (this.sorted === false) {
            this.sorted = true;
        } else {
            this.sorted = false;
        }
        this.onNotify(this.page);
        return this.sorted;
    }

    onBtnInfoClick(btnInfoLinking: string) {
        this.categoryService.btnInfoLinking = btnInfoLinking;
    }

    onChange(event: any) {
        this.onNotify(1);
    }

    onCategoryAdded(newCategory: Category): void {
        this.categories.pop();
        this.categories.unshift(newCategory);
    }

    onDelete(category: Category): void {
        this.currentCategory = category;
    }

    confirmDelete(): void {
        this.categoryService.deleteCategory(this.currentCategory.Id)
            .subscribe(() => {
                this.categories = this.categories.filter(x => x.Id !== this.currentCategory.Id);
            },
            (err) => console.log(err)
            );
    }

    onSelectFilter(numberFilter: any): void {
        if (numberFilter === 'All') {
            numberFilter = 0;
        }
        this.pageSize = numberFilter;
        this.onNotify(1);
    }

    dropDownElements() {
        if (this.pageSize === 0) {
            return 'Elements by Page: All';
        } else {
            return 'Elements by Page: ' + this.pageSize;
        }
    }
}
