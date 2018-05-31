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
        console.log(req.headers.get('lat'),req.headers.get('long'));
        console.log(req.headers?1:2);
        console.log(req);
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))._token:"",
            'deviceid':  req.headers.get('device_id')?req.headers['device_id']:
                           (localStorage.getItem('device_id')?localStorage.getItem('device_id'):""),
            'accept-language': req.headers.get('lang')?req.headers['lang']:
                                (localStorage.getItem('lang')?localStorage.getItem('lang'):"en"),
            'latitude': req.headers.get('lat') ? req.headers.get('lat') : 
                                  (localStorage.getItem('lat')?localStorage.getItem('lat'):""),
            'longitude': req.headers.get('long') ? req.headers.get('long') : 
                        (localStorage.getItem('long')?localStorage.getItem('long'):""),
            'market-type-id':req.headers.get('market') ? req.headers.get('market') : 
            (localStorage.getItem('market')?localStorage.getItem('market'):""),           
            'os':navigator.platform,
            
          })
        });
              
        console.log(authReq.headers.get('latitude'),authReq.headers.get('latitude'));
        console.log('Intercepted HTTP call', authReq);
      
        return next.handle(authReq);
      }      

      
}