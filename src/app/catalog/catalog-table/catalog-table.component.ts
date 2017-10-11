import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
import { PaginationComponent } from '../../pagination/pagination.component';

import { Category } from '../../common/models/models';
import { CategoryService } from '../../common/services/category.service';

@Component({
    selector: 'app-catalog-table',
    templateUrl: './catalog-table.component.html',
    styleUrls: ['./catalog-table.component.css']
})

export class CatalogTableComponent implements OnInit {

    searchableList: string[];
    categories: Category[];
    path: string[] = ['Name'];
    order = 1;

    constructor(private categoryService: CategoryService
    ) {
        this.searchableList = ['Name'];
    }

    ngOnInit() {
        this.categoryService.getCategories()
            .then(categories => { this.categories = categories; });
    }

    sortTable(prop: string) {
        this.path = prop.split('.');
        this.order = this.order * (-1);
        return false;
    }
}
