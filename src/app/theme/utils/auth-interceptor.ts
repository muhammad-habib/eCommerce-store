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
            'Authorization': localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))._token:"",
            'deviceid': localStorage.getItem('device_id')?localStorage.getItem('device_id'):"",
            'accept-language': localStorage.getItem('lang')?localStorage.getItem('lang'):"",
            'latitude':localStorage.getItem('lat')?localStorage.getItem('lat'):"",
            'longitude':localStorage.getItem('long')?localStorage.getItem('long'):"",
            'os':navigator.platform,
            
          })
        });
              
        console.log('Intercepted HTTP call', authReq);
      
        return next.handle(authReq);
      }      

      
}