import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Course, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { CourseService } from '../../../common/services/course.service';

import { handleError } from '../../../common/functions/functions';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {
    regex;
    error;
    course: Course;
    categories: Category[];
    isLoaded = false;
    isUnique = false;
    isPaid = false;
    afterCheck = false;
    submitMessage = '';

    constructor(
        private authService: AuthService,
        private categoryService: CategoryService,
        private courseService: CourseService
    ) {
        this.course = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
    }
    @Output()
    afterCourseAdded: EventEmitter<Course> = new EventEmitter<Course>();

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
        if (this.isUnique) {
            this.createCourse();
            form.reset();
            this.isUnique = false;
        } else {
            this.courseService.checkIfCourseExists(this.course.Name)
                .subscribe(response => {
                    const result = response as Course;
                    if (result.Name === 'unique') {
                        this.isUnique = true;
                        this.createLinking();
                        this.createCourse();
                        form.reset();
                        this.isUnique = false;
                    } else {
                        this.isUnique = false;
                        this.course.Linking = '';
                        this.afterCheck = true;
                    }
                },
                err => (handleError)
                );
        }
    }

    createCourse() {
        this.courseService.createCourse(this.course)
            .subscribe(course => {
                this.submitMessage = 'Course was created successfully';
                this.showSnackbar();
                this.afterCourseAdded.emit(course as Course);
            },
            err => {
                this.submitMessage = this.error.ERROR;
                this.showSnackbar();
            }
            );
    }

    showSnackbar() {
        const x = document.getElementById('snackbar')
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }

    checkName() {
        this.courseService.checkIfCourseExists(this.course.Name)
            .subscribe(response => {
                const result = response as Course;
                if (result.Name === 'unique') {
                    this.isUnique = true;
                    this.createLinking();
                } else {
                    this.isUnique = false;
                    this.course.Linking = '';
                    this.afterCheck = true;
                }
            },
            err => (handleError)
            );
    }

    createLinking(): void {
        this.course.Linking = this.course.Name.replace(this.regex.LINKING, '');
    }
}
