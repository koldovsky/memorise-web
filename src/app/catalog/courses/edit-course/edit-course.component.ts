import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category } from '../../../common/models/models';

import { CategoryService } from '../../../common/services/category.service';
import { ComunicationService } from '../../../common/services/comunication.service';
import { CourseService } from '../../../common/services/course.service';
import { ModeratorComponent } from '../../../moderator/moderator.component';
import { MatDialog } from '@angular/material';
import { AddDeckComponent } from '../../decks/add-deck/add-deck.component';

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
        private categoryService:CategoryService,
        private courseService: CourseService,
        private moderatorComponent: ModeratorComponent,
        private comunicationService: ComunicationService,
        private dialog: MatDialog,
    ) { };

    ngOnInit(): void {
        this.categoryService.getCategories()
        .then(categories => this.categories = categories);

        this.courseService.getCourse(this.courseService.btnInfoLinking)
        .then(c => {
            this.course = c;
            this.courseLinking = c.Linking;
            this.isLoaded = true;
        });
    }; 

    setWhichButtonIsClicked(){
        this.comunicationService.whichButtonIsClicked = "courses";
    }
    // const select = document.getElementById("selectCategoryId");
    // var categoryName = select.options[select.selectedIndex].value;
    openAddDecksDialog(): void {
        const dialogRef = this.dialog.open(AddDeckComponent, {
          width: '400px',
          data:
          {
            
          }
        });
      }
}
