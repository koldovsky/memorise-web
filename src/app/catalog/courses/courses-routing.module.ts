import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { DeckDetailsComponent } from '../decks/deck-details/deck-details.component';

const route: Routes = [
    {
        path: 'courses',
        component: CoursesComponent
    },
    {
        path: 'courses/:name',
        component: CourseDetailsComponent
    },
    {
        path: 'courses/:name/:name',
        component: DeckDetailsComponent
    }
    // {
    //     path: 'courses',
    //     component: CoursesComponent,
    //     children: [
    //         {
    //             path: ':name',
    //             component: CourseDetailsComponent,
    //             children: [
    //                 {
    //                     path: ':name',
    //                     component: DeckDetailsComponent
    //                 }
    //             ]
    //         }
    //     ]
    // }
];

@NgModule({
    imports: [
        RouterModule.forChild(route)
    ],
    exports: [
        RouterModule
    ]
})

export class CoursesRoutingModule { }
