import { Component,ElementRef, OnInit } from '@angular/core';
import { QuizService } from '../common/services/quiz.service';
import { Card, Answer } from '../common/models/models';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
  })
export class QuizComponent implements OnInit {
    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute
    ) { }
    cards: Card[];
    cardCount;
    counter: number = 0;

    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.quizService
        .GetCardsByDeck(decodeURIComponent(params.get('name'))))
        .subscribe(cards => {
            this.cards = cards;
            this.cardCount = cards.length;
            this.cards.forEach(card =>{
                card.Answers.forEach(answer => {
                    this.answerCheck(answer, false);
                });
            });
        });
    }
    counterMinus(){
        if(this.counter > 0){
            this.counter--;
        }
    };
    counterPlus(){
        if(this.counter < this.cards.length-1){
            this.counter++;
        }
    };
    heapCtrl(){
        if(!this.counter){
            document.getElementById("leftHeap").hidden = true;
            document.getElementById("RightHeap").hidden = false;
        }
        else if(this.counter === this.cards.length-1){
            document.getElementById("leftHeap").hidden = false;
            document.getElementById("RightHeap").hidden = true;
        }
        else{
           document.getElementById("leftHeap").hidden = false;
           document.getElementById("RightHeap").hidden = false;
        }
    };
    
    finishQuiz(){
       console.log("You choose:");
       this.cards.forEach(card => {
           this.check(card);
       });

   };
   countPassedQuistions(): number{
       return this.counter;
   };
   countLeftQuistions(): number{
       return (this.cards.length -1) - this.counter;
   };
   passedQuistionOrQuistions(): string{
       if(this.countPassedQuistions() === 1){
           return "question";
       }else{
           return "questions";
       }
   };
   leftQuistionOrQuistions(): string{
       if(this.countLeftQuistions() === 1){
           return "question";
       }else{
           return "questions";
       }
   };
   changeAnswerCheck(answer:Answer) {
       answer.Checked = !answer.Checked;
  };
  answerCheck(answer: Answer, IsChecked: boolean){
       answer.Checked = IsChecked;
  };

   checkQuestion(){
       const card: Card = this.cards[this.counter];
       let isUncorrectChecked : boolean = false;
       let correctAnswersCount: number = 0;
       let checkedAnswersCount: number = 0;
       card.Answers.forEach(answer => {
           const lable = <HTMLInputElement>document.getElementById('lable' + answer.Id);
           if(answer.Checked){
               checkedAnswersCount++;
           }if(answer.IsCorrect){
               lable.style.color = 'green';
               correctAnswersCount++;
           }else if(answer.Checked && !answer.IsCorrect){
               lable.style.color = 'red';
               isUncorrectChecked = true;
           }else{
               lable.style.color = 'black'
           }
           const cardTitle = <HTMLInputElement>document.getElementById('cardTitle' + card.Id);
           if(!isUncorrectChecked && correctAnswersCount === checkedAnswersCount){
               cardTitle.style.color = 'green';
           }else{
               cardTitle.style.color = 'red';
           }
       });
   };

   check(card: Card){
       console.log(card.Question);
       console.log("Your answers on " + card.Question + ": ");
       card.Answers.forEach(answer => {
           let result;
           if(answer.Checked && answer.IsCorrect){
               result = ". And it is right";
               console.log(answer.Text + " - " + answer.Checked + result);
           }else if(answer.Checked && !answer.IsCorrect){
               result = ". And it is uncorrect";
               console.log(answer.Text + " - " + answer.Checked + result);
           }
       });
   };

    setChecked(){
       const card: Card = this.cards[this.counter];
       setTimeout(function(){
           card.Answers.forEach(answer => {
               let checkbox = <HTMLInputElement>document.getElementById('checkbox' + answer.Id);
               if(answer.Checked){
                   checkbox.checked = true;
               }
           });
       }, 20);
   };

   getImgPreNameLeft(): string{
       if((this.cardCount - 2) == this.counter){
           return '1';
       }else if((this.cardCount - 3) == this.counter){
           return '2';
       }else{
           return '3';
       }
   };

   getImgPreNamePassed(): string{
       if(this.counter == 1){
           return '1';
       }else if(this.counter == 2){
           return '2';
       }else{
           return '3';
       }
   };

   cleanColor(){
       const card : Card = this.cards[this.counter];
       const cardId: number = card.Id;
        setTimeout(function(){
           const cardTitle = <HTMLInputElement>document
           .getElementById('cardTitle' + cardId);
           cardTitle.style.color = "black";   
        }, 20); 
   };
}
