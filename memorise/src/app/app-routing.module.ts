import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';

const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full"},
    { path: "courses", component: CoursesComponent },
    { path: "decks", component: DecksComponent }    
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {};
