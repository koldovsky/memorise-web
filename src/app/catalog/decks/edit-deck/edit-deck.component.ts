import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category, Deck, Card } from '../../../common/models/models';

import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';
import { ModerationService } from '../../../common/services/moderation.service';
import { CourseService } from '../../../common/services/course.service';
import { ModeratorComponent } from '../../../moderator/moderator.component';
import { MatDialog } from '@angular/material';
import { AddDeckComponent } from '../../decks/add-deck/add-deck.component';
import { CardService } from '../../../common/services/card.service';
import { FileUploader } from 'ng2-file-upload';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';

@Component({
    selector: 'edit-deck',
    templateUrl: './edit-deck.component.html',
    styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit {
    regex;
    error;
    deckBeforeChanges: Deck;
    uploader: FileUploader;
    deck: Deck;
    decks: Deck[];
    //deckNames: string[] = [];
    categories: Category[];
    newCategory: string;
    submitMessage = '';
    isUnique = false;
    afterCheck = false;
    isLoadedDeck = false;
    isLoadedCategories = false;
    isLoadedCards = false;
    imageIsChanged = false;

    constructor(
        private categoryService: CategoryService,
        private deckService: DeckService,
        private courseService: CourseService,
        private cardService: CardService,
        private moderatorComponent: ModeratorComponent,
        private moderationService: ModerationService
    ) { }

    ngOnInit(): void {

        this.regex = regexExpression;
        this.error = errorMessages;
        this.categoryService.getCategories()
            .then(categories => {
                this.categories = categories;
                this.isLoadedCategories = true;
            });

        this.deckService.getDeckByLinking(this.deckService.btnInfoLinking)
            .then(c => {
                this.deck = c;
                this.deckBeforeChanges = {
                    Name: c.Name,
                    Linking: c.Linking,
                    Description: c.Description,
                    Price: c.Price,
                    Photo: c.Photo,
                    CourseNames: c.CourseNames.slice(),
                    CategoryName: c.CategoryName
                };
                this.deckBeforeChanges.CategoryName = c.CategoryName;
                this.isLoadedDeck = true;
            });
    }

    setWhichButtonIsClicked() {
        this.moderationService.whichButtonIsClicked = 'decks';
    }

    onSubmit() {
        console.log('I am in onSubmit');
        // console.log(this.deck);
        // this.deckService.updateDeck(this.deck)
        //     .subscribe(response => {
        //         console.log(response);
        //     },
        //     (err) => console.log(err)
        //     );
        if (this.checkDeckForChanges()) {
            this.checkNameAndUpdate();
        } 
        
    }

    saveDeck() {
        this.deckService.getDeckByLinking(this.deck.Linking)
            .then(deck => this.deck = deck);
        this.moderationService.setCurrentDeck(this.deck);
    }

    checkNameAndUpdate(){
        if (this.course.Name === this.courseBeforeChanges.Name || this.isUnique ) {
           this.updateCourse();
            this.isUnique = false;
        } else {
            this.courseService.checkIfCourseExists(this.course.Name)
                .subscribe(response => {
                    const result = response as Course;
                    if (result.Name === 'unique') {
                        this.isUnique = true;
                        this.createLinking();
                        this.updateCourse();
                        this.isUnique = false;
                    } else {
                        this.isUnique = false;
                        this.afterCheck = true;
                    }
                },
                err => (handleError)
                );
        }
    }
    updateCourse() {
        this.courseService.updateCourse(this.course)
        .subscribe(course => {
            this.submitMessage = 'Course was updated successfully';
            if ( this.imageIsChanged ) {
            this.uploader.queue[0].url = `${this.uploadUrl}/${(course as Course).Linking}`;
            this.uploader.queue[0].alias = 'Photo';
            this.uploader.uploadAll();
            }
            this.showSnackbar();
            this.courseBeforeChanges = course as Course;
            },
            err => {
                this.submitMessage = this.error.ERROR;
                this.showSnackbar();
            }
        );
    }
    showSnackbar() {
        const x = document.getElementById('snackbar')
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }
    checkDeckForChanges(): boolean {
        if (
            this.imageIsChanged ||
            this.deck.CategoryName !== this.deckBeforeChanges.CategoryName ||
            this.deck.Description.trim() !== this.deckBeforeChanges.Description.trim() ||
            this.deck.Name !== this.deckBeforeChanges.Name ||
            this.deck.Price !== this.deckBeforeChanges.Price
        ) {
           return true;
        } else { return false; }
    }
    imageSet() {
        this.imageIsChanged = true;
       }
       checkName() {
        this.courseService.checkIfCourseExists(this.course.Name)
            .subscribe(response => {
                const result = response as Course;
                if (result.Name === 'unique') {
                    this.isUnique = true;
                    this.createLinking();
                } else {
                    this.isUnique = false;
                    this.afterCheck = true;
                }
            },
            err => (handleError)
            );
    }
    createLinking(): void {
        this.course.Linking = this.course.Name.replace(this.regex.LINKING, '');
    }

}
