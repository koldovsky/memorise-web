import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './catalog/courses/courses.component';
import { DecksComponent } from './catalog/decks/decks.component';
import { CourseDetailsComponent } from './catalog/courses/course-details/course-details.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized-component';
import { QuizComponent } from './quiz/quiz.component';
import { ProfileComponent } from './auth/user/profile/profile.component';
import { QuizResultsComponent } from './quiz/results/quiz-results.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { LoginComponent } from './auth/components/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },

    {
        path: 'profile/:name',
        component: ProfileComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
