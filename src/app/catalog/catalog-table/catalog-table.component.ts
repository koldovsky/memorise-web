import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
import { PaginationComponent } from '../../pagination/pagination.component';

import { Category, PageResponse } from '../../common/models/models';
import { CategoryService } from '../../common/services/category.service';
import { CreateCategoryComponent} from '../create-category/create-category.component';

import { Observable } from 'rxjs/Observable';

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
        this.categoryService.getCategories()
            .then(categories => this.totalCount = categories.length);
    }

    onNotify(index: number): void {
        this.categoryService.getCategoriesByPage(index + 1, this.pageSize, this.sorted)
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

    onBtnInfoClick(btnInfoLinking: string) {
        //this.courseService.btnInfoLinking = btnInfoLinking;
      }

    onCategoryAdded(newCategory:Category):void{
        // this.categories.pop();
        // this.categories.unshift(newCourse);
        this.pageResponse.items.pop();
        this.pageResponse.items.unshift(newCategory);
    }

    onDelete(category: Category):void{
        this.currentCategory = category;
    }

    confirmDelete():void{
        this.categoryService.deleteCategory(this.currentCategory.Id)
        .subscribe(()=>{
        //this.categories = this.categories.filter(x=>x.Id!==this.currentCategory.Id);
        this.pageResponse.items = this.pageResponse.items.filter(x=>x.Id!==this.currentCategory.Id); 
        },
        (err)=>console.log(err)
        );
    }
}
