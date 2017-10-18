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

@Component({
    selector: 'edit-deck',
    templateUrl: './edit-deck.component.html',
    styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit {
    deckBeforeChanges: Deck;
    deck: Deck;
    categories: Category[];
    deckLinking: string = '';

    addedCardsLinking: string[];
    chosenCardsLinking: string[];

    addedCoursesLinking: string[];
    chosenCoursesLinking: string[];

    newCategory: string;

    isLoadedDeck: boolean = false;
    isLoadedCategories: boolean = false;
    isLoadedCards: boolean = false;


    constructor(
        private categoryService: CategoryService,
        private deckService: DeckService,
        private courseService: CourseService,
        private cardService: CardService,
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

        this.deckService.getDeckByLinking(this.deckService.btnInfoLinking)
            .then(c => {
                this.deck = c;
                this.deckLinking = c.Linking;
                this.isLoadedDeck = true;
                this.deckBeforeChanges = c;
            })

        // this.deckService.getDeckByLinking(this.courseService.btnInfoLinking)
        // .then(c => {
        //     this.deckBeforeChanges = c;
        // })
    };

    setWhichButtonIsClicked() {
        this.moderationService.whichButtonIsClicked = "decks";
    }

    // onModalSubmit(){
    //     for(let i=0; i < this.addedDecksLinking.length; i++) {
    //         this.deckNames = this.deckNames.filter(x => x !== this.addedDecksLinking[i]);
    //         this.course.DeckNames.push(this.addedDecksLinking[i]);
    //     }
    // };

    onSubmit() {
        console.log("I am in onSubmit");
        console.log(this.deck);
        this.deckService.updateDeck(this.deck)
            .subscribe(response => {
                console.log(response);
            },
            (err) => console.log(err)
            );
        //this.ngOnInit();
    }

    // deleteDecks(){
    //     for(let i = 0; i < this.chosenDecksLinking.length; i++){
    //         this.course.DeckNames = this.course.DeckNames
    //         .filter(x => x.toLowerCase() !== this.chosenDecksLinking[i].toLowerCase());
    //         this.deckNames.push(this.chosenDecksLinking[i]);
    //     }
    // }
}
