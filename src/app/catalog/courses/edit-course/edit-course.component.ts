import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, Category, Deck } from '../../../common/models/models';

import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';
import { ModerationService } from '../../../common/services/moderation.service';
import { CourseService } from '../../../common/services/course.service';
import { ModeratorComponent } from '../../../moderator/moderator.component';
import { MatDialog } from '@angular/material';
import { AddDeckComponent } from '../../decks/add-deck/add-deck.component';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';
import { handleError } from '../../../common/functions/functions';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

    regex;
    error;
    courseBeforeChanges: Course;
    uploader: FileUploader;
    course: Course;
    categories: Category[];
    decks: Deck[];
    deckNames: string[] = [];
    addedDecksLinking: string[];
    chosenDecksLinking: string[];
    newCategory: string;
    submitMessage = '';
    isUnique = false;
    afterCheck = false;
    isLoadedCourse = false;
    isLoadedCategories = false;
    isLoadedDecks = false;
    imageIsChanged = false;

    uploadUrl = 'http://localhost:37271/Image/UploadPhotoForCourse';

    constructor(
        private categoryService: CategoryService,
        private deckService: DeckService,
        private courseService: CourseService,
        private moderatorComponent: ModeratorComponent,
        private moderationService: ModerationService
    ) {
        this.uploader = new FileUploader({
            url: this.uploadUrl,
            queueLimit: 1,
            removeAfterUpload: true
        });
    }

    ngOnInit(): void {
        this.regex = regexExpression;
        this.error = errorMessages;
        this.categoryService.getCategories()
            .then(categories => {
                this.categories = categories;
                this.isLoadedCategories = true;
            });

        this.courseService.getCourse(this.courseService.btnInfoLinking)
            .then(c => {
                this.course = c;
                this.courseBeforeChanges = {
                    Name: c.Name,
                    Linking: c.Linking,
                    Description: c.Description,
                    Price: c.Price,
                    Photo: c.Photo,
                    DeckNames: c.DeckNames.slice(),
                    CategoryName: c.CategoryName
                };
                this.courseBeforeChanges.CategoryName = c.CategoryName;
                this.isLoadedCourse = true;
                this.getDecksNotFromCourse();
            });
    }
    setWhichButtonIsClicked() {
        this.moderationService.whichButtonIsClicked = 'courses';
    }

    onModalSubmit() {
        for (let i = 0; i < this.addedDecksLinking.length; i++) {
            this.deckNames = this.deckNames.filter(x => x !== this.addedDecksLinking[i]);
            this.course.DeckNames.push(this.addedDecksLinking[i]);
        }
    }

    onSubmit() {
        if (this.checkCourseForChanges()) {
            this.checkNameAndUpdate();
        } else {
            if (this.checkDecksForChanges()) {
                this.checkNameAndUpdate();
            }
        }
    }
    checkNameAndUpdate() {
        if (this.course.Name === this.courseBeforeChanges.Name || this.isUnique) {
            this.updateCourse();
            this.isUnique = false;
        } else {
            this.courseService.checkIfCourseExists(this.course.Name)
                .subscribe(response => {
                    const result = response as Course;
                    if (result.Name === 'unique') {
                        this.isUnique = true;
                        this.createLinking();
                        this.updateCourse();
                        this.isUnique = false;
                    } else {
                        this.isUnique = false;
                        this.afterCheck = true;
                    }
                },
                err => (handleError)
                );
        }
    }
    updateCourse() {
        this.courseService.updateCourse(this.course)
            .subscribe(course => {
                this.submitMessage = 'Course was updated successfully';
                if (this.imageIsChanged) {
                    this.uploader.queue[0].url = `${this.uploadUrl}/${(course as Course).Linking}`;
                    this.uploader.queue[0].alias = 'Photo';
                    this.uploader.uploadAll();
                }
                this.showSnackbar();
                this.courseBeforeChanges = course as Course;
            },
            err => {
                this.submitMessage = this.error.ERROR;
                this.showSnackbar();
            }
            );
    }
    showSnackbar() {
        const x = document.getElementById('snackbar');
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }
    checkCourseForChanges(): boolean {
        if (
            this.imageIsChanged ||
            this.course.CategoryName !== this.courseBeforeChanges.CategoryName ||
            this.course.Description.trim() !== this.courseBeforeChanges.Description.trim() ||
            this.course.Name !== this.courseBeforeChanges.Name ||
            this.course.Price !== this.courseBeforeChanges.Price ||
            this.course.DeckNames.length !== this.courseBeforeChanges.DeckNames.length
        ) {
            return true;
        } else { return false; }
    }
    checkDecksForChanges(): boolean {
        let countConcidences = 0;
        this.course.DeckNames.forEach(
            deckNameNew => {
                this.courseBeforeChanges.DeckNames.forEach(
                    deckNameOld => {
                        if (deckNameNew === deckNameOld) {
                            countConcidences++;
                        }
                    });
            });
        if (countConcidences === this.courseBeforeChanges.DeckNames.length) {
            return false;
        } else { return true; }
    }

    imageSet() {
        this.imageIsChanged = true;
    }
    deleteDecks() {
        for (let i = 0; i < this.chosenDecksLinking.length; i++) {
            this.course.DeckNames = this.course.DeckNames
                .filter(x => x.toLowerCase() !== this.chosenDecksLinking[i].toLowerCase());
            this.deckNames.push(this.chosenDecksLinking[i]);
        }
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
                    this.afterCheck = true;
                }
            },
            err => (handleError)
            );
    }
    createLinking(): void {
        this.course.Linking = this.course.Name.replace(this.regex.LINKING, '');
    }
    getDecksNotFromCourse() {
        this.deckService.getDecks()
            .then(decks => {
                this.decks = decks.filter(x => {
                    let isMap = true;
                    this.course.Decks.forEach(y => {
                        if (y.Linking.toLowerCase() === x.Linking.toLowerCase()) {
                            isMap = false;
                        }
                    });
                    if (isMap) {
                        this.deckNames.push(x.Name);
                    }
                    return isMap;
                });
                this.isLoadedDecks = true;
            });
    }
}
