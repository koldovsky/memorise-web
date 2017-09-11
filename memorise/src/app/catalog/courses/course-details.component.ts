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
        price: null
    };

   ngOnInit(): void {}
}
