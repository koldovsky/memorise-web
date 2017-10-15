import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from '../../common/models/models';

import { AuthService } from '../../common/services/auth.service';
import { CategoryService } from '../../common/services/category.service';
import { handleError } from '../../common/functions/functions';


@Component({
    selector: 'create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})

export class CreateCategoryComponent implements OnInit {
   category:Category;
   isUnique:boolean = false;
   afterCheck:boolean = false;
   submitMessage:string='';

    constructor(
        private authService: AuthService,
        private categoryService:CategoryService
    ) { 
        this.category = {
            Name: '',
            Linking: ''
        };
      }

    ngOnInit(): void {}

    onSubmit() { 
        this.categoryService.createCategory(this.category)
        .then(category=>{
            this.submitMessage = "Category was created successfully";
            this.showSnackbar();
            this.afterCategoryAdded.emit(category);
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
     this.categoryService.checkIfCategoryExists(this.category.Name)
     .then(response =>{
        if(response.Name=='unique'){
           this.isUnique = true;
           this.createLinking();
        }
        else{
           this.isUnique = false;
           this.category.Linking="";
           this.afterCheck=true;
        }
    })
    .catch(handleError);
    }

    createLinking():void{
        this.category.Linking = this.category.Name.replace(/[^a-zA-Z0-9]/g, "");
    }

    @Output() 
    afterCategoryAdded: EventEmitter<Category>=new EventEmitter<Category>();
        
}
