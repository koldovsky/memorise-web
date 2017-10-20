import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../common/services/auth.service';
import { handleError } from '../../../common/functions/functions';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';
import { CardService } from '../../../common/services/card.service';
import { Card, CardType, Deck, Answer } from '../../../common/models/models';
import { ModerationService } from '../../../common/services/moderation.service';

@Component({
    selector: 'create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.css']
})

export class CreateCardComponent implements OnInit {
    regex;
    error;
    card: Card;
    deck: Deck;
    cardTypes: CardType[];
    isLoaded = false;
    isUnique = false;
    isPaid = false;
    afterCheck = false;
    submitMessage = '';
    correctAnswer = '';
    numbersOfAnswers: number[];
    chosenNumbersOfAnswers: number;
    answersArray: number[] = [];

    constructor(
        private authService: AuthService,
        private cardService: CardService,
        private moderationService: ModerationService
    ) {
        this.card = {
            Question: '',
            CardType: null,
            Deck: null,
            Answers: null
        };
        this.numbersOfAnswers = [1, 2, 3, 4, 5, 6];
        this.chosenNumbersOfAnswers = 0;
    }

    @Output()
    afterCardAdded: EventEmitter<Card> = new EventEmitter<Card>();

    ngOnInit(): void {
        this.regex = regexExpression;
        this.error = errorMessages;
        this.deck = this.moderationService.getCurrentDeck();

        this.cardService.getCardTypes()
            .subscribe(response => {
                this.cardTypes = response as CardType[];
                this.isLoaded = true;
            });
    }

    onSelectNumber(item: number) {
        console.log(item);
        this.chosenNumbersOfAnswers = item;
        this.createAnswersArray(item);
    }

    createAnswersArray(numbers: number) {
        this.answersArray = [];
        for (let i = 1; i <= numbers; i++) {
            this.answersArray.push(i);
        }
    }

    onSubmit(form: NgForm) {
        if (this.isUnique) {
            this.createCard();
            form.reset();
            this.isUnique = false;
        }

        // else{
        //     this.courseService.checkIfCourseExists(this.course.Name)
        //    .subscribe(response =>{
        //        let result=response as Course;
        //        if(result.Name=='unique'){
        //           this.isUnique = true;
        //           this.createLinking();
        //           this.createCourse();
        //           form.reset();
        //           this.isUnique=false;
        //        }
        //        else{
        //           this.isUnique = false;
        //           this.course.Linking="";
        //           this.afterCheck=true;
        //        }
        //      },
        //      err=>(handleError)
        //     );
        // }
    }

    createCard() {
        // this.courseService.createCourse(this.course)
        // .subscribe(course=>{
        //     this.submitMessage = "Course was created successfully";
        //     this.showSnackbar();
        //     this.afterCourseAdded.emit(course as Course);
        // },
        // err=>{
        //     this.submitMessage = this.error.ERROR;
        //     this.showSnackbar();
        // }
        // );
    }

    showSnackbar() {
        const x = document.getElementById('snackbar')
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }

    checkName() {
        //  this.courseService.checkIfCourseExists(this.course.Name)
        //  .subscribe(response =>{
        //      let result=response as Course;
        //      if(result.Name=='unique'){
        //         this.isUnique = true;
        //         this.createLinking();
        //      }
        //      else{
        //         this.isUnique = false;
        //         this.course.Linking="";
        //         this.afterCheck=true;
        //      }
        //    },
        //    err=>(handleError)
        //   );
    }
}
