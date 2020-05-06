import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthService } from '../auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('in AuthInterceptor');

    const authReq = req.clone({

      setHeaders: {
        // Authorization: `Bearer ${this.auth.credential}`,
        // Authorization: `Bearer OGFjN2E0Yzk3MGY4NTI5NDAxNzEwNzFjMzAwZDE0N2V8cm5hUmNRUTVNWg`,
        Accept: 'application/json'
      }
    });
    return next.handle(authReq);
  }

}
