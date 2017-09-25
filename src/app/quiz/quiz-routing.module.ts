import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { QuizComponent } from './quiz.component';

const route: Routes = [
    {
        path: 'quiz/:name',
        component: QuizComponent
    }
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