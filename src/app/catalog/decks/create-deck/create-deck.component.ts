import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Deck, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';

import { handleError } from '../../../common/functions/functions';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';

@Component({
    selector: 'create-deck',
    templateUrl: './create-deck.component.html',
    styleUrls: ['./create-deck.component.css']
})

export class CreateDeckComponent implements OnInit {
    
    regex;
    error; 
    submitMessage: string;
    deck: Deck;
    categories: Category[];
    isLoaded: boolean = false;
    isUnique: boolean = false;
    isPaid: boolean = false;
    afterCheck: boolean = false;
    

    constructor(
        private authService: AuthService,
        private categoryService: CategoryService,
        private deckService: DeckService
    ) {
        this.deck = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
    }

    ngOnInit(): void {
        this.regex = regexExpression;
        this.error = errorMessages;
        this.categoryService.getCategories()
            .then(categories => {
                this.categories = categories;
                this.isLoaded = true;
            });
    }
    
    onSubmit(form: NgForm) { 
        if(this.isUnique){
            this.createDeck();
            form.reset();
            this.isUnique=false;
        }
        
        else{
            this.deckService.checkIfDeckExists(this.deck.Name)
           .subscribe(response =>{
               let result=response as Deck;
               if(result.Name=='unique'){
                  this.isUnique = true;
                  this.createLinking();
                  this.createDeck();
                  form.reset();
                  this.isUnique=false;
               }
               else{
                  this.isUnique = false;
                  this.deck.Linking="";
                  this.afterCheck=true;
               }
             },
             err=>(handleError)
            );
        }
    }

    createDeck(){
        this.deckService.createDeck(this.deck)
        .subscribe(deck=>{
            this.submitMessage = "Deck was created successfully";
            this.showSnackbar();
            this.afterDeckAdded.emit(deck as Deck);
        },
        err=>{
            this.submitMessage = this.error.ERROR;
            this.showSnackbar();
        }
        );
}

    showSnackbar(){
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    checkName(){
    this.deckService.checkIfDeckExists(this.deck.Name)
        .subscribe(response =>{
            let result=response as Deck;
            if(result.Name=='unique'){
               this.isUnique = true;
               this.createLinking();
            }
            else{
               this.isUnique = false;
               this.deck.Linking="";
               this.afterCheck=true;
            }
          },
          err=>(handleError)
         );
       }

    createLinking():void{
        this.deck.Linking = this.deck.Name.replace(this.regex.LINKING, "");
    }
    
     @Output() 
    afterDeckAdded: EventEmitter<Deck>=new EventEmitter<Deck>();    
}
