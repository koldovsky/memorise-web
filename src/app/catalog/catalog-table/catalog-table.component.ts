import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
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
    page = 0; pageSize = this.arrayOfElementByPage[0];
    pageResponse: PageResponse<Category>;
    sorted: boolean;
    searchText: string;
    currentCategory: Category;

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
        this.sortTable();
    }

    onNotify(index: number): void {
        this.categoryService.getCategoriesByPage(index + 1, +this.pageSize, this.sorted, this.searchText)
            .then(pageResponse => {
                this.categories = pageResponse.items;
                this.page = index;
                this.totalCount = pageResponse.totalCount;
            });
    }

    onNext(): void {
        this.onNotify(this.page + 1);
    }

    onPrev(): void {
        this.onNotify(this.page - 1);
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

    onChange(event: any) {
        this.onNotify(0);
    }

    onCategoryAdded(newCategory: Category): void {
        this.pageResponse.items.pop();
        this.pageResponse.items.unshift(newCategory);
    }

    onDelete(category: Category): void {
        this.currentCategory = category;
    }

    confirmDelete(): void {
        this.categoryService.deleteCategory(this.currentCategory.Id)
            .subscribe(() => {
                this.pageResponse.items = this.pageResponse.items.filter(x => x.Id !== this.currentCategory.Id);
            },
            (err) => console.log(err)
            );
    }

    onSelectFilter(numberFilter: any): void {
        if (numberFilter === 'All') {
            numberFilter = 0;
        }
        this.pageSize = numberFilter;
        this.onNotify(0);
    }
}
