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
    MdGridListModule, MdTabsModule, MdDialogModule,
    MdInputModule, MdPaginatorModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './catalog/categories.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';
import { CourseDetailsComponent } from './catalog/courses/course-details/course-details.component';
import { ProfileComponent } from './users/customer/profile.component';
import { AccountComponent } from './users/customer/account.component';
import { SecurityComponent } from './users/customer/security.component';
import { UserCoursesComponent } from './users/customer/user-courses.component';
import { UserDecksComponent } from './users/customer/user-decks.component';
import { StatisticsComponent } from './users/customer/statistics.component';
import { LoginComponent } from './auth/components/login.component';
import { CardsComponent } from './catalog/cards/cards.component';
import { DeckDetailsComponent } from './catalog/decks/deck-details/deck-details.component';
import { PageNotFoundComponent } from './not-found-component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './auth/components/register.component';

import { CategoryService } from './common/services/category.service';
import { CourseService } from './common/services/course.service';
import { DeckService } from './common/services/deck.service';
import { UserService } from './common/services/user.service';
import { QuizService } from './common/services/quiz.service';


import { CoursesModule } from './catalog/courses/courses.module';
import { DecksModule } from './catalog/decks/decks.module';
import { AppRoutingModule } from './app-routing.module';
import { QuizModule } from './quiz/quiz.module';

@NgModule({
    declarations: [
        CategoriesComponent,
        CourseDetailsComponent,
        CoursesComponent,
        DecksComponent,
        ProfileComponent,
        AccountComponent,
        SecurityComponent,
        UserCoursesComponent,
        UserDecksComponent,
        StatisticsComponent,
        LoginComponent,
        CardsComponent,
        DeckDetailsComponent,
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        QuizComponent,
        RegisterComponent
    ],
    entryComponents: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
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
        MdTabsModule,
        CoursesModule,
        MdPaginatorModule,
        DecksModule,
        QuizModule,
        AppRoutingModule
        MdTabsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        CategoryService,
        CourseService,
        DeckService,
        UserService,
        QuizService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
