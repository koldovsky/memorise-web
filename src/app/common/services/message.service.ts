import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/RX';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private notify$ = new Subject<any>();
    temp: any;
    constructor() { }

    notify(object: any) {
        this.temp = object;
        this.notify$.next(object);
    }

    getMessage(): Observable<any> {
        return this.notify$.asObservable();
    }
}
