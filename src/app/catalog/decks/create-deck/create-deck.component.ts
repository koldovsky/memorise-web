import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Deck, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';

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

    constructor(
        private authService: AuthService,
        private categoryService:CategoryService,
        private deckService: DeckService
    ) { 
        this.deck = {
            Name: '',
            Linking: '',
            Price: 0
        };
      }

    onSubmit() { 
        console.log(this.deck);
        this.deckService.createDeck(this.deck);
    }

    ngOnInit(): void {
        this.categoryService.getCategories()
        .then(categories => {
            this.categories = categories;
            this.isLoaded = true;
        });
    }

    checkName(){
     this.deckService.checkIfDeckExists(this.deck.Name)
     .then(() =>{
          this.isUnique = false;
          this.afterCheck=true;
     })
     .catch(()=>{
        this.isUnique = true;
        this.createLinking();
     });
           
    }
    createLinking():void{
        this.deck.Linking = this.deck.Name.replace(/[^a-zA-Z0-9]/g, "");
    }
    
        
}
