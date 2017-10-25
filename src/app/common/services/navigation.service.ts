import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Route, Router } from '@angular/router';

@Injectable()
export class NavigationService {
    dependency = 'courses';
    category = 'Any';
}
