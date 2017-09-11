import { Injectable } from "@angular/core";

import { COURSES } from "../mocks/courses";
import { Course } from "../models/models";

@Injectable()
export class CourseService {
    getCourses(): Promise<Course[]> {
        return Promise.resolve(COURSES);
    }
}