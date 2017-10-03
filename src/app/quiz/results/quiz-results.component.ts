import { Component,ElementRef, OnInit } from '@angular/core';
import { QuizService } from '../../common/services/quiz.service';
import { Card, Answer } from '../../common/models/models';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { QuizComponent } from '../quiz.component';

@Component({
    selector: 'quiz-results',
    templateUrl: './quiz-results.component.html',
    styleUrls: ['./quiz-results.component.css']
  })
export class QuizResultsComponent implements OnInit {

  cards : Card[];
  constructor(
    private quizService: QuizService
) { }
  ngOnInit(): void {
    this.cards = this.quizService.cards;
  }
  checkAnswer(answer: Answer): string{
     let result = answer.Text;
     if(answer.Checked && answer.IsCorrect){
         result += ", it is right";
         return result;
     }else if(answer.Checked && !answer.IsCorrect){
         result += ", it is uncorrect";
         return result;
     }
     return "";
  }
}