import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from '../../common/models/models';

import { AuthService } from '../../common/services/auth.service';
import { CategoryService } from '../../common/services/category.service';


@Component({
    selector: 'create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css']
})

export class CreateCategoryComponent implements OnInit {
   category:Category;
   isUnique:boolean = false;
   isPaid:boolean = false;
   afterCheck:boolean = false;

    constructor(
        private authService: AuthService,
        private categoryService:CategoryService
    ) { 
        this.category = {
            Name: '',
            Linking: ''
        };
      }

    onSubmit() { 
        console.log(this.category);
        this.categoryService.createCategory(this.category);
        
    }

    ngOnInit(): void {}

    checkName(){
     this.categoryService.checkIfCategoryExists(this.category.Name)
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
        this.category.Linking = this.category.Name.replace(/[^a-zA-Z0-9]/g, "");
    }
    
        
}
