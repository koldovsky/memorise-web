import { Component } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-moderator',
    templateUrl: './moderator.component.html',
    styleUrls: ['./moderator.component.css']
  })

export class ModeratorComponent {}

// // extends DataSource<any> {
// //     connect(): Observable<Element[]> {
// //         return Observable.of(courses);
// //     }

// //     disconnect() {}
// }
