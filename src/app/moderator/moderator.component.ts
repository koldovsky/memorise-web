import { Component, OnInit, NgModule } from '@angular/core';

import { Course, Deck } from '../common/models/models';
import { CourseService } from '../common/services/course.service';
import { DeckService } from '../common/services/deck.service';
import { CreateCourseComponent } from '../catalog/courses/create-course/create-course.component';
import { CourseTableComponent } from '../catalog/courses/course-table/course-table.component';
import { DeckTableComponent } from '../catalog/decks/deck-table/deck-table.component';
import { CatalogTableComponent } from '../catalog/catalog-table/catalog-table.component';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})

export class ModeratorComponent implements OnInit {
  courses: Course[];
  decks: Deck[];
  whichButtonIsClicked = 'categories';

  constructor(private courseService: CourseService,
              private deckService: DeckService
  ) { }

  ngOnInit() {
    this.courseService.getCourses()
      .then(courses => this.courses = courses );
    this.deckService.getDecks()
      .then(decks => this.decks = decks );
      }

  onClick(event) {
    const clickedButton = event.target;
    this.whichButtonIsClicked = clickedButton.id;
  }

}
