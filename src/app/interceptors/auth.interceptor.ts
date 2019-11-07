import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Navigator } from '../helpers/navigator';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('/token')) {
      return next.handle(request);
    }

    const clone = request.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    });

    return next.handle(clone).catch((error) => {
      if (error.status !== 401) {
        return Observable.throw(error);
      }

      return this.authService.reAuthenticate().pipe(
        switchMap(() => {
          // tslint:disable-next-line:no-shadowed-variable
          const clone = request.clone({
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
          });
          return next.handle(clone);
        }),
        // tslint:disable-next-line:no-shadowed-variable
        catchError((error) => {
          Navigator.navigateToLogin();
          return Observable.throw(error);
        })
      );
    });
  }
}
