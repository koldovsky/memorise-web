import { Headers, Response } from '@angular/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

export function handleError(error: Response | any): Promise<any> {
    let message: string;

    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        message = `${error.status} - ${err}`;
    } else {
        message = error.message ? error.message : error.toString();
    }

    console.error(message);

    return Promise.reject(error.message || error);
}
