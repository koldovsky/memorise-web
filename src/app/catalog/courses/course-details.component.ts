import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'course-details',
    templateUrl: './course-details.component.html'
})

export class CourseDetailsComponent implements OnInit {
    course = {
        id: 1,
        name: 'course1',
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
            },
            {
                id: 3,
                name: 'deck3',
                description: 'description3',
                rating: 5,
                photo: './placeholder-thumb.jpg',
                price: null
            },
            {
                id: 4,
                name: 'deck4',
                description: 'description4',
                rating: 5,
                photo: './placeholder-thumb.jpg',
                price: null
            },
            {
                id: 5,
                name: 'deck5',
                description: 'description5',
                rating: 5,
                photo: './placeholder-thumb.jpg',
                price: null
            },
            {
                id: 6,
                name: 'deck6',
                description: 'description6',
                rating: 5,
                photo: './placeholder-thumb.jpg',
                price: null
            }]
    };

   ngOnInit(): void {}
}
