import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User, Token } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class UploadService {
    errorMessage = '';
    private valid = true;
    private commonUrl = 'http://localhost:37271/';
    private uploadApiUrl = 'memo/images/upload';
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    upload(image: any) {
        const url = `${this.commonUrl}/${this.uploadApiUrl}`;
        // this.http.post(url, )
        // .toPromise()
        // .then()
        // .catch(handleError);
    }
}
