import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { User, Token } from '../models/models';
import { handleError } from '../functions/functions';
import { environment } from '../../../environments/environment';

@Injectable()
export class UploadService {
    errorMessage = '';
    private valid = true;
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    upload(image: any) {
        const url = environment.uploadApiUrl;
    }
}
