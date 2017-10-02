import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses/courses.component';
import { CatalogComponent } from './catalog.component';
import { DecksComponent } from './decks/decks.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';

const route: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent,
        children: [
                    {
                        path: 'courses',
                        component: CoursesComponent
                    },
                    {
                        path: 'decks',
                        component: DecksComponent
                    },
                    {
                        path: 'courses/:name',
                        component: CourseDetailsComponent
                    }
                ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(route)
    ],
    exports: [
        RouterModule
    ]
})

export class CatalogRoutingModule { }
