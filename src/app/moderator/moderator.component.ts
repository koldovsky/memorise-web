import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateCourseComponent} from '../catalog/courses/create-course/create-course.component'

import { AuthService } from '../common/services/auth.service';

@Component({
    selector: 'app-moderator',
    templateUrl: './moderator.component.html',
    styleUrls: ['./moderator.component.css']
  })

export class ModeratorComponent {
  constructor(private dialog: MatDialog,
    private auth:AuthService) { }

  openCreateNewCourseDialog(): void {
    const dialogRef = this.dialog.open(CreateCourseComponent, {
      width: '400px',
      data:
      {
        action:'Create new course',
        name: '',
        description: '',
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   //this.name = result;
    // });
  }
}
