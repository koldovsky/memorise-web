import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { CourseService } from '../../../common/services/course.service';

@Component({
    selector: 'create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {
   course:Course;
   categories: Category[];
   isLoaded:boolean=false;

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
        this.courseService.createCourse(this.course);
    }

    ngOnInit(): void {
        this.categoryService.getCategories()
        .then(categories => {
            this.categories = categories;
            this.isLoaded = true;
        });
    }
    checkName(){
        let result=this.courseService.checkIfCourseExists(this.course.Name);
        console.log(result);
    }
        
}
