import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { CourseService } from '../../../common/services/course.service';

import { handleError } from '../../../common/functions/functions';


@Component({
    selector: 'create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {
   course:Course;
   categories: Category[];
   isLoaded:boolean = false;
   isUnique:boolean = false;
   isPaid:boolean = false;
   afterCheck:boolean = false;
   submitMessage:string='';

    constructor(
        private authService: AuthService,
        private categoryService:CategoryService,
        private courseService: CourseService
    ) { 
        this.course = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
      }

    onSubmit() { 
        console.log(this.course);
        this.courseService.createCourse(this.course)
        .then(()=>{
            this.submitMessage = "Course was created successfully";
            this.showSnackbar();
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

    ngOnInit(): void {
        this.categoryService.getCategories()
        .then(categories => {
            this.categories = categories;
            this.isLoaded = true;
        });
    }

    checkName(){
     this.courseService.checkIfCourseExists(this.course.Name)
     .then(response =>{
         if(response.Name=='unique'){
            this.isUnique = true;
            this.createLinking();
         }
         else{
            this.isUnique = false;
            this.course.Linking="";
            this.afterCheck=true;
         }
          
     })
     .catch(handleError);
           
    }
    createLinking():void{
        this.course.Linking = this.course.Name.replace(/[^a-zA-Z0-9]/g, "");
    }
    
        
}
