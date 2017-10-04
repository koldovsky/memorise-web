import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoursesComponent } from '../catalog/courses/courses.component';
import { DecksComponent } from '../catalog/decks/decks.component';
import { AdminComponent } from './admin.component';

const adminRoute: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
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
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoute)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {}
