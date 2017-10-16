import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
import { PaginationComponent } from '../../pagination/pagination.component';

import { Category, PageResponse } from '../../common/models/models';
import { CategoryService } from '../../common/services/category.service';

@Component({
    selector: 'app-catalog-table',
    templateUrl: './catalog-table.component.html',
    styleUrls: ['./catalog-table.component.css']
})

export class CatalogTableComponent implements OnInit {

    categories: Category[];
    totalCount: number;
    page = 0; pageSize = 2;
    index = 1;
    pageResponse: PageResponse<Category>;
    sorted: boolean;

    constructor(private courseService: CategoryService
    ) {
        this.pageResponse = new PageResponse<Category>();
        this.pageResponse.items = [];
    }

    ngOnInit() {
        this.sortTable();
        // this.onNotify(this.page);
        this.courseService.getCategories()
            .then(categories => this.totalCount = categories.length);
    }

    onNotify(index: number): void {
        this.courseService.getCategoriesByPage(index + 1, this.pageSize, this.sorted)
            .then(categories => {
                this.pageResponse = categories;
                this.page = index;
            });
    }

    onNext(): void {
        this.onNotify(this.page + this.index);
    }

    onPrev(): void {
        this.onNotify(this.page - this.index);
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
}
