import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatExpansionModule,
    MatLineModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTableModule
} from '@angular/material';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';

import {FormsModule, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';
import { CourseDetailsComponent } from './catalog/courses/course-details/course-details.component';
import { ProfileComponent } from './auth/user/profile/profile.component';
import { StatisticsComponent } from './auth/user/statistics/statistics.component';
import { LoginComponent } from './auth/components/login.component';
import { CardsComponent } from './catalog/cards/cards.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized-component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { QuizResultsComponent } from './quiz/results/quiz-results.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { CreateCourseComponent } from './catalog/courses/create-course/create-course.component';
import { CreateDeckComponent } from './catalog/decks/create-deck/create-deck.component';
import { CreateCategoryComponent } from './catalog/create-category/create-category.component';
import { CreateCardComponent } from './catalog/cards/create-card/create-card.component'
import { PaginationComponent } from './pagination/pagination.component';
import { EditCourseComponent } from './catalog/courses/edit-course/edit-course.component';

import { AuthService } from './common/services/auth.service';
import { CategoryService } from './common/services/category.service';
import { CourseService } from './common/services/course.service';
import { DeckService } from './common/services/deck.service';
import { UserService } from './common/services/user.service';
import { UserSubscriptionsService } from './common/services/user-subscriptions.service';
import { QuizService } from './common/services/quiz.service';
import { StatisticsService } from './common/services/statistics.service';
import { InterceptorService } from './common/services/interceptor.service';
import { PagerService } from './common/services/pager.service';
import { ModerationService } from './common/services/moderation.service';

import { CatalogModule } from './catalog/catalog.module';
import { AppRoutingModule } from './app-routing.module';
import { QuizModule } from './quiz/quiz.module';
import { FooterComponent } from './footer/footer.component';
import { MessageService } from './common/services/message.service';
import { UserModule } from './auth/user/user.module';
import { ProfileModule } from './auth/user/profile/profile.module';
import { ModeratorModule } from './moderator/moderator.module';
import { RegisterModule } from './auth/components/register/register.module';

import { FilterPipe } from './pipes/filter.pipe';
import { SortingPipe } from './pipes/sorting.pipe';
import { CourseTableComponent } from './catalog/courses/course-table/course-table.component';
import { DeckTableComponent } from './catalog/decks/deck-table/deck-table.component';
import { CatalogTableComponent } from './catalog/catalog-table/catalog-table.component';
import { AddDeckComponent } from './catalog/decks/add-deck/add-deck.component';
import { NumberToArrayPipeComponent } from './pipes/number-to-array.pipe';
import { EditDeckComponent } from './catalog/decks/edit-deck/edit-deck.component';
import { CardService } from './common/services/card.service';
import { CardTableComponent } from './catalog/cards/card-table/card-table.component';

import { AppComponent } from './app.component';





@NgModule({
    declarations: [
        CatalogComponent,
        CourseDetailsComponent,
        CoursesComponent,
        DecksComponent,
        ProfileComponent,
        LoginComponent,
        CardsComponent,
        AppComponent,
        FilterPipe,
        SortingPipe,
        NumberToArrayPipeComponent,
        HomeComponent,
        PageNotFoundComponent,
        UnauthorizedComponent,
        QuizComponent,
        RegisterComponent,
        NavigationComponent,
        FooterComponent,
        ProfileComponent,
        StatisticsComponent,
        QuizResultsComponent,
        ModeratorComponent,
        CreateCourseComponent,
        CreateCategoryComponent,
        CreateDeckComponent,
        CreateCardComponent,
        PaginationComponent,
        CourseTableComponent,
        EditCourseComponent,
        EditDeckComponent,
        DeckTableComponent,
        CatalogTableComponent,
        CardTableComponent,
        AddDeckComponent,
    ],
    entryComponents: [
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        CreateCourseComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
        MatChipsModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,

        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ModeratorModule,
        CatalogModule,
        QuizModule,
        AppRoutingModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        ProfileModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RegisterModule,
        UserModule
    ],
    providers: [
        AuthService,
        CategoryService,
        CourseService,
        DeckService,
        UserService,
        UserSubscriptionsService,
        QuizService,
        ModerationService,
        ModeratorComponent,
        CardService,
        PagerService,
        StatisticsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
