import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';
import { CourseDetailsComponent } from './catalog/courses/course-details.component';
import { DeckDetailsComponent } from './catalog/decks/deck-details.component';
import { ProfileComponent } from './users/customer/profile.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'courses',
        component: CoursesComponent
    },
    {
        path: 'course/:name',
        component: CourseDetailsComponent
    },
    {
        path: 'deck/:name',
        component: DeckDetailsComponent
    },
    {
        path: 'decks',
        component: DecksComponent
    },
    {
        path: 'user/:id',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
