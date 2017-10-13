import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category, Deck } from '../../../common/models/models';

import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';
import { ComunicationService } from '../../../common/services/comunication.service';
import { CourseService } from '../../../common/services/course.service';
import { ModeratorComponent } from '../../../moderator/moderator.component';
import { MatDialog } from '@angular/material';
import { AddDeckComponent } from '../../decks/add-deck/add-deck.component';
import $ from 'jquery';

@Component({
    selector: 'edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
   course: Course;
   categories: Category[];
   courseLinking : string = '';
   decks: Deck[];
   addedDecksLinking: string[];
   chosenDecksLinking: string[];
   newCategory: string;

   isLoadedCourse: boolean=false;
   isLoadedCategories: boolean=false;
   isLoadedDecks: boolean=false;
   

    constructor(
        private categoryService: CategoryService,
        private deckService: DeckService,        
        private courseService: CourseService,
        private moderatorComponent: ModeratorComponent,
        private comunicationService: ComunicationService,
        private dialog: MatDialog,
    ) { };

    ngOnInit(): void {
        this.categoryService.getCategories()
        .then(categories => {
            this.categories = categories;
            this.isLoadedCategories = true;
        });

        this.courseService.getCourse(this.courseService.btnInfoLinking)
        .then(c => {
            this.course = c;
            this.courseLinking = c.Linking;
            this.isLoadedCourse = true;
        })
        .then(c => {
            this.deckService.getDecks()
            .then(decks => {
                this.decks = decks.filter(x => {
                    let isMap: boolean = true;
                    this.course.Decks.forEach(y => {
                        if(y.Linking.toLowerCase() === x.Linking.toLowerCase()){
                            isMap = false;
                        }
                    });
                    return isMap;
                });
                this.isLoadedDecks = true;
            }); 
        });
    };

    setWhichButtonIsClicked(){
        this.comunicationService.whichButtonIsClicked = "courses";
    }
    
    onSubmit(){
        for(let i=0; i < this.addedDecksLinking.length; i++) {
           this.deckService.getDeckByLinking(this.addedDecksLinking[i])
           .then(x => {
               this.course.Decks.push(x); 
               this.decks = this.decks.filter(d => d.Linking.toLowerCase() !== x.Linking.toLowerCase());
            });
        }
    };

    deleteDecks(){
        console.log(this.chosenDecksLinking.length);
        for(let i = 0; i < this.chosenDecksLinking.length; i++){
            this.course.Decks = this.course.Decks
            .filter(x => x.Linking.toLowerCase() !== this.chosenDecksLinking[i].toLowerCase());
        }
        for(let i = 0; i < this.chosenDecksLinking.length; i++){
            this.deckService.getDeckByLinking(this.chosenDecksLinking[i])
            .then(x => {
                this.decks.push(x); 
             });
        }
    }
}
