import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';

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
        private categoryServide:CategoryService
    ) { 
        this.course = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
      }

    submitted = false;
    onSubmit() { this.submitted = true; }

    ngOnInit(): void {
        this.categoryServide.getCategories()
        .then(categories => {
            this.categories = categories;
            this.isLoaded = true;
            console.log('service is done');
        });
    }
}
