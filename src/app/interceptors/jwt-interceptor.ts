import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environment/env';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (
      req.url.startsWith(`${env.apiUrl}`) &&
      !req.url.startsWith(`${env.apiUrl}/auth`)
    ) {
      req = req.clone({
        setHeaders: {
        //   'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(req);
  }
}
