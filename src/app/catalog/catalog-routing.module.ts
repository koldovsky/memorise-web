import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses/courses.component';
import { CatalogComponent } from './catalog.component';
import { DecksComponent } from './decks/decks.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { AddDeckComponent } from './decks/add-deck/add-deck.component';

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
                    }
                ]
    },
    {
        path: 'catalog/courses/:name',
        component: CourseDetailsComponent
    },
    {
        path: 'moderator/courses/edit/:name',
        component: EditCourseComponent
    },
    {
        path: 'moderator/decks',
        component: AddDeckComponent
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
