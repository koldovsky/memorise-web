import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {
    MdButtonModule, MdCardModule,
    MdMenuModule, MdToolbarModule,
    MdIconModule, MdListModule,
    MdButtonToggleModule, MdSidenavModule,
    MdExpansionModule, MdLineModule,
    MdGridListModule, MdTabsModule, MdDialogModule, MdInputModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './catalog/categories.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';
import { CourseDetailsComponent } from './catalog/courses/course-details.component';
import { ProfileComponent } from './users/customer/profile.component';
import { AccountComponent } from './users/customer/account.component';
import { SecurityComponent } from './users/customer/security.component';
import { UserCoursesComponent } from './users/customer/user-courses.component';
import { UserDecksComponent } from './users/customer/user-decks.component';
import { StatisticsComponent } from './users/customer/statistics.component';
import { LoginComponent } from './auth/components/login.component';
import { CardsComponent } from './catalog/cards/cards.component';
import { DeckDetailsComponent } from './catalog/decks/deck-details.component';
import { CategoryService } from './common/services/category.service';
import { CourseService } from './common/services/course.service';
import { DeckService } from './common/services/deck.service';
import { UserService } from './common/services/user.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CategoriesComponent,
        CoursesComponent,
        CourseDetailsComponent,
        DecksComponent,
        ProfileComponent,
        AccountComponent,
        SecurityComponent,
        UserCoursesComponent,
        UserDecksComponent,
        StatisticsComponent,
        LoginComponent,
        CardsComponent,
        DeckDetailsComponent
    ],
    entryComponents: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpModule,
        MdButtonModule,
        MdCardModule,
        MdMenuModule,
        MdToolbarModule,
        MdIconModule,
        MdListModule,
        MdButtonToggleModule,
        MdDialogModule,
        MdSidenavModule,
        MdExpansionModule,
        MdInputModule,
        MdLineModule,
        MdGridListModule,
        MdTabsModule
    ],
    providers: [
        CategoryService,
        CourseService,
        DeckService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
