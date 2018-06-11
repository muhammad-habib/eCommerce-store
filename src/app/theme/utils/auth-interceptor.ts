import { Injectable, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor( private spinner: NgxSpinnerService,
                 private router: Router,
                 private appService: AppService,
    ) {}

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add a custom header
        if(req.headers.get('external_link')=='1'){
          const authReq = req.clone({
            headers: new HttpHeaders({})});
          return next.handle(authReq);
        }else{
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

        return next
            .handle(authReq)
            .do((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    if (ev.body.status_code === 401) {
                        this.appService.logedIn = false;
                        localStorage.removeItem('user');
                        this.router.navigateByUrl('/sign-in');
                        return Observable.throw(ev);
                    }
                }
            })
            .catch(response => {
                if (response instanceof HttpErrorResponse) {
                    console.log('Processing http error', response);
                }

                return Observable.throw(response);
            });
      }
    }
}
