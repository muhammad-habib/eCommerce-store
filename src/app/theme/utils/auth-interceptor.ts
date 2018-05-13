import { Injectable, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor( private spinner: NgxSpinnerService) {}
  
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        // add a custom header
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': localStorage.getItem('token')?localStorage.getItem('token'):""
          })
        });
              
        console.log('Intercepted HTTP call', authReq);
      
        return next.handle(authReq);
      }      

      
}