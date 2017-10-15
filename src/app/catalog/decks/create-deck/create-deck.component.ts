import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Deck, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';

import { handleError } from '../../../common/functions/functions';

@Component({
    selector: 'create-deck',
    templateUrl: './create-deck.component.html',
    styleUrls: ['./create-deck.component.css']
})

export class CreateDeckComponent implements OnInit {
   deck:Deck;
   categories: Category[];
   isLoaded:boolean = false;
   isUnique:boolean = false;
   isPaid:boolean = false;
   afterCheck:boolean = false;
   submitMessage:string='';

    constructor(
        private authService: AuthService,
        private categoryService:CategoryService,
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
        this.categoryService.getCategories()
        .then(categories => {
            this.categories = categories;
            this.isLoaded = true;
        });
    }
    
    onSubmit() { 
        this.deckService.createDeck(this.deck)
        .then(deck=>{
            this.submitMessage = "Deck was created successfully";
            this.showSnackbar();
            this.afterDeckAdded.emit(deck);
        })
        .catch(()=>{
            this.submitMessage = "Error occurred. Please try again.";
            this.showSnackbar();
        })
    }

    showSnackbar(){
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    checkName(){
     this.deckService.checkIfDeckExists(this.deck.Name)
     .then(response =>{
         if(response.Name=='unique'){
            this.isUnique = true;
            this.createLinking();
         }
         else{
            this.isUnique = false;
            this.deck.Linking="";
            this.afterCheck=true;
         }
          
     })
     .catch(handleError);
    }

    createLinking():void{
        this.deck.Linking = this.deck.Name.replace(/[^a-zA-Z0-9]/g, "");
    }
    
     @Output() 
    afterDeckAdded: EventEmitter<Deck>=new EventEmitter<Deck>();    
}
