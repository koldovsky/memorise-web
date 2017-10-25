import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router, NavigationStart } from '@angular/router';

import { CategoryService } from '../common/services/category.service';
import { Category } from '../common/models/models';
import { MessageService } from '../common/services/message.service';
import { NavigationService } from '../common/services/navigation.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit, OnDestroy {
    constructor(
        private categoryService: CategoryService,
        private navigation: NavigationService,
        private router: Router
    ) { }

    categories: Category[];

    ngOnInit(): void {
        this.categoryService.getCategories()
            .then(categories => this.categories = categories);
    }

    ngOnDestroy(): void {
        this.navigation.category = 'Any';
    }

    navigateTo(category: string): void {
        this.navigation.category = category;
        this.router.navigate(this.getRouterLink(category));
    }

    getRouterLink(category: string): string[] {
        return ['catalog', this.navigation.dependency, this.navigation.category];
    }
}
