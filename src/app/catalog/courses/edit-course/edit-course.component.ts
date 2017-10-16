import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category, Deck } from '../../../common/models/models';

import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';
import { ModerationService } from '../../../common/services/moderation.service';
import { CourseService } from '../../../common/services/course.service';
import { ModeratorComponent } from '../../../moderator/moderator.component';
import { MatDialog } from '@angular/material';
import { AddDeckComponent } from '../../decks/add-deck/add-deck.component';

@Component({
    selector: 'edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
    courseBeforeChanges : Course;
   course: Course;
   categories: Category[];
   courseLinking : string = '';
   decks: Deck[];
   deckNames: string[] = [];
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
        private moderationService: ModerationService,
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
            this.course.DeckNames = [];
            c.Decks.forEach(x => this.course.DeckNames.push(x.Name));
            this.course.CategoryName = c.Category.Name;
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
                    if(isMap){
                        this.deckNames.push(x.Name);
                    }
                    return isMap;
                });
                this.isLoadedDecks = true;
            }); 
        });

        this.courseService.getCourse(this.courseService.btnInfoLinking)
        .then(c => {
            this.courseBeforeChanges = c;
            this.courseBeforeChanges.DeckNames = [];
            c.Decks.forEach(x => this.courseBeforeChanges.DeckNames.push(x.Name));
            this.courseBeforeChanges.CategoryName = c.Category.Name;
        })
    };

    setWhichButtonIsClicked(){
        this.moderationService.whichButtonIsClicked = "courses";
    }
    
    onModalSubmit(){
        for(let i=0; i < this.addedDecksLinking.length; i++) {
            this.deckNames = this.deckNames.filter(x => x !== this.addedDecksLinking[i]);
            this.course.DeckNames.push(this.addedDecksLinking[i]);
        }
    };

    onSubmit() { 
        if(
            this.course.CategoryName !== this.courseBeforeChanges.CategoryName ||
            this.course.Description.trim() !== this.courseBeforeChanges.Description.trim() ||
            this.course.Name !== this.courseBeforeChanges.Name ||
            this.course.Linking !== this.courseBeforeChanges.Linking ||
            this.course.Price !== this.courseBeforeChanges.Price ||
            this.course.DeckNames.length !== this.courseBeforeChanges.Decks.length
        ){  
            
            console.log("I am in first IF");
            this.courseService.updateCourse(this.course);
            this.ngOnInit();
        }else{
            console.log("I am in else");
            let countConcidences: number = 0;
            this.course.DeckNames.forEach(x => {
                this.courseBeforeChanges.Decks.forEach(y => {
                    if(x === y.Name){
                        countConcidences++;
                    }
                })
            })
            if(countConcidences === this.courseBeforeChanges.Decks.length){
                console.log("Here is return");
                return;
            }
            console.log("Here is  NOT return");
            this.courseService.updateCourse(this.course);
            this.ngOnInit();
        }
    }

    deleteDecks(){
        for(let i = 0; i < this.chosenDecksLinking.length; i++){
            this.course.DeckNames = this.course.DeckNames
            .filter(x => x.toLowerCase() !== this.chosenDecksLinking[i].toLowerCase());
            this.deckNames.push(this.chosenDecksLinking[i]);
        }
    }
}
