import { Component } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
  })

export class AdminComponent {}

// // extends DataSource<any> {
// //     connect(): Observable<Element[]> {
// //         return Observable.of(courses);
// //     }

// //     disconnect() {}
// }
