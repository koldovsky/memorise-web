import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { CourseService } from '../../../common/services/course.service';

@Component({
    selector: 'edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
   course:Course;
   categories: Category[];
   isLoaded: boolean=false;
   courseLinking : string = '';

    constructor(
        private authService: AuthService,
        private categoryService:CategoryService,
        private courseService: CourseService
    ) { };

    ngOnInit(): void {
        this.categoryService.getCategories()
        .then(categories => this.categories = categories);

        this.courseService.getCourse(this.courseService.btnInfoLinking)
        .then(c => {
            this.course = c;
            this.courseLinking = c.Linking;
            this.isLoaded = true;
            console.log(this.course);
        });
    }; 

    // const select = document.getElementById("selectCategoryId");
    // var categoryName = select.options[select.selectedIndex].value;
}
