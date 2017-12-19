import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { AuthService } from './auth.service';

import {Observable} from 'rxjs/Observable'

@Injectable()
export class TransityInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let client_id = "my-trusted-client";
    let client_secret = 'secret';
    var authReq;
    var basicheader = btoa(client_id + ':' + client_secret);
    if(!this.auth.getToken()){
       authReq = req.clone({
        headers: req.headers.set('Authorization','Basic '+basicheader)
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
    }
    else {
       authReq = req.clone({
        headers: req.headers.set('Authorization',this.auth.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
    

    return next.handle(authReq);
  }
}