import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { QuizComponent } from './quiz.component';
import { QuizResultsComponent } from './results/quiz-results.component';

const route: Routes = [
    {
        path: ':from/:name/quiz/:quizType',
        component: QuizComponent,
    },
    {
        path: ':from/:name/quiz/:quizType/results',
        component: QuizResultsComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(route)
    ],
    exports: [
        RouterModule
    ]
})

export class QuizRoutingModule { }
