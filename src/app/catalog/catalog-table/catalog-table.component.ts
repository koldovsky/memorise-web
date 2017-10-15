import { Component, OnInit, Pipe, PipeTransform, NgModule } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortingPipe } from '../../pipes/sorting.pipe';
import { PaginationComponent } from '../../pagination/pagination.component';

import { Category } from '../../common/models/models';
import { CategoryService } from '../../common/services/category.service';
import { CreateCategoryComponent} from '../create-category/create-category.component';

import { Observable } from 'rxjs/Observable';

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
    currentCategory: Category;

    constructor(private categoryService: CategoryService
    ) {
        this.searchableList = ['Name'];
        this.currentCategory = {
            Name: '',
            Linking: ''
        };
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

    onCategoryAdded(newCategory:Category):void{
        this.categories.pop();
        console.log(newCategory);
        this.categories.unshift(newCategory);
    }

    onDelete(category: Category):void{
        this.currentCategory = category;
    }

    confirmDelete():void{
        this.categoryService.deleteCategory(this.currentCategory.Id)
        .subscribe(()=>{
        this.categories = this.categories.filter(x=>x.Id!==this.currentCategory.Id); 
        },
        (err)=>console.log(err)
        );
    }
}
