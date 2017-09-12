import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details.component';

const routes: Routes = [
    {
        path: "courses",
        component: CoursesComponent,
        children: [
            {
                path: "course/:id", component: CourseDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class CatalogRoutingModule { };
