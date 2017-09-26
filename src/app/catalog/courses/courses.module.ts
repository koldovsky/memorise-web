import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseService } from '../../common/services/course.service';


@NgModule({
    imports: [
        CoursesRoutingModule
    ]
})

export class CoursesModule { }
