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

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with success response 

      }
    }, (err) => {

      if (err instanceof HttpErrorResponse) {
        
        if (err.status === 400) {
          let message = JSON.stringify(err.error);
          const expr = /The request is invalid/;
          if(message.match(expr)){
            auth.setError("user with such login already exists!");
          }
          else{
          let correctMessage=message.slice(16,message.length-4);
          auth.setError(correctMessage);
          }
          
        }
        if (err.status === 401) {
          
          auth.setError("Access denied! You need to SignIn.");
          this.router.navigate(['/unauthorized']);
        }
        
      }
    });
  }

}