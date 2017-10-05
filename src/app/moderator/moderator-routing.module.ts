import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoursesComponent } from '../catalog/courses/courses.component';
import { DecksComponent } from '../catalog/decks/decks.component';
import { ModeratorComponent } from './moderator.component';

const moderatorRoute: Routes = [
    {
        path: 'moderator',
        component: ModeratorComponent,
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
        RouterModule.forChild(moderatorRoute)
    ],
    exports: [
        RouterModule
    ]
})

export class ModeratorRoutingModule {}
