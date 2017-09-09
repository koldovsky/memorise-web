import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule, MdCardModule,
    MdMenuModule, MdToolbarModule,
    MdIconModule, MdListModule,
    MdButtonToggleModule, MdSidenavModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './catalog/categories.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';

import { AppRoutingModule } from './app-routing.module'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CategoriesComponent,
        CoursesComponent,
        DecksComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MdButtonModule,
        MdCardModule,
        MdMenuModule,
        MdToolbarModule,
        MdIconModule,
        MdListModule,
        MdButtonToggleModule,
        MdSidenavModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
