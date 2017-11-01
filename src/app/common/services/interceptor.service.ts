import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';
import { errorMessages } from '../helpers/errorMessages';
import { httpCode } from '../helpers/http-status-code';

@Injectable()
export class InterceptorService implements HttpInterceptor {
   ERROR;
   HTTP_STATUS_CODE;
  constructor(
    private injector: Injector,
    private router: Router
  ) {
    this.ERROR = errorMessages;
    this.HTTP_STATUS_CODE = httpCode;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    const CHAR_TO_SKIP_BEGIN = 16;
    const CHAR_TO_SKIP_END = 4;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === this.HTTP_STATUS_CODE.BAD_REQUEST) {
          const message = JSON.stringify(err.error);
          const expr = /The request is invalid/;
          if (message.match(expr)) {
            auth.setError(this.ERROR.USER_EXISTS);
          } else {
            const correctMessage = message.slice(CHAR_TO_SKIP_BEGIN, message.length - CHAR_TO_SKIP_END);
            auth.setError(correctMessage);
          }
        }
        if (err.status === this.HTTP_STATUS_CODE.UNAUTHORIZED) {
          auth.setError(this.ERROR.ACCESS_DENIED);
          this.router.navigate(['/unauthorized']);
        }
      }
    });
  }
}
