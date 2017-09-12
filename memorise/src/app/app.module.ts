import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule, MdCardModule,
    MdMenuModule, MdToolbarModule,
    MdIconModule, MdListModule,
    MdButtonToggleModule, MdSidenavModule,
    MdExpansionModule, MdLineModule
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './catalog/categories.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';
import { CourseDetailsComponent } from './catalog/courses/course-details.component';

import { AppRoutingModule } from './app-routing.module'
import { CategoryService } from './common/services/category.service';
import { CourseService } from './common/services/course.service';
import { CatalogRoutingModule  } from './catalog/catalog-routing.module';
import { DeckService } from "./common/services/deck.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CategoriesComponent,
        CoursesComponent,
        CourseDetailsComponent,
        DecksComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CatalogRoutingModule,
        HttpModule,
        MdButtonModule,
        MdCardModule,
        MdMenuModule,
        MdToolbarModule,
        MdIconModule,
        MdListModule,
        MdButtonToggleModule,
        MdSidenavModule,
        MdExpansionModule,
        MdLineModule
    ],
    providers: [
        CategoryService,
        CourseService,
        DeckService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
