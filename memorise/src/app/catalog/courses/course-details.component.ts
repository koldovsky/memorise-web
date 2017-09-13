import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'course-details',
    templateUrl: './course-details.component.html'
})

export class CourseDetailsComponent implements OnInit {
    course = {
        id: 1,
        name: 'course1course1course1',
        description: 'description1',
        rating: 4,
        photo: './app/catalog/courses/placeholder-thumb.jpg',
        price: null,
        decks: [
            {
                id: 1,
                name: 'deck1',
                description: 'description1',
                rating: 4,
                photo: './app/catalog/decks/placeholder-thumb.jpg',
                price: null
            },
            {
                id: 2,
                name: 'deck2',
                description: 'description2',
                rating: 5,
                photo: './placeholder-thumb.jpg',
                price: null
            }]
    };

   ngOnInit(): void {}
}
