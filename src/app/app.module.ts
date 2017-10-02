import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {
    MatButtonModule, MatCardModule,
    MatMenuModule, MatToolbarModule,
    MatIconModule, MatListModule,
    MatButtonToggleModule, MatSidenavModule,
    MatExpansionModule, MatLineModule,
    MatGridListModule, MatTabsModule, MatDialogModule,
    MatInputModule, MatPaginatorModule,
    MatChipsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
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
import { PageNotFoundComponent } from './not-found-component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './auth/components/register.component';

import { CategoryService } from './common/services/category.service';
import { CourseService } from './common/services/course.service';
import { DeckService } from './common/services/deck.service';
import { UserService } from './common/services/user.service';
import { QuizService } from './common/services/quiz.service';

import { CatalogModule } from './catalog/catalog.module';
import { AppRoutingModule } from './app-routing.module';
import { QuizModule } from './quiz/quiz.module';

@NgModule({
    declarations: [
        CatalogComponent,
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
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        QuizComponent,
        RegisterComponent,
        NavigationComponent
    ],
    entryComponents: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,

        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatSidenavModule,
        MatExpansionModule,
        MatInputModule,
        MatLineModule,
        MatGridListModule,
        MatTabsModule,
        MatPaginatorModule,
        MatTabsModule,
        MatChipsModule,

        FormsModule,
        ReactiveFormsModule,

        CatalogModule,
        QuizModule,
        AppRoutingModule
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
