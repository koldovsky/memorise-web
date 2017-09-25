import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizService } from '../common/services/quiz.service';


@NgModule({
    imports: [
        QuizRoutingModule
    ]
})
export class QuizModule { }