import { Injectable, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router} from '@angular/router';
import { AppService} from '../../app.service';
import { LocalStorageObject } from '../../locale-storage'

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
            'Authorization': LocalStorageObject.getItem('user')?JSON.parse(LocalStorageObject.getItem('user'))._token:"",
            'deviceid':  req.headers.get('device_id')?req.headers['device_id']:
                           (LocalStorageObject.getItem('device_id')?LocalStorageObject.getItem('device_id'):""),
            'accept-language': req.headers.get('lang')?req.headers['lang']:
                                (LocalStorageObject.getItem('lang')?LocalStorageObject.getItem('lang'):"en"),
            'latitude': req.headers.get('lat') ? req.headers.get('lat') :
                                  (LocalStorageObject.getItem('lat')?LocalStorageObject.getItem('lat'):""),
            'longitude': req.headers.get('lng') ? req.headers.get('lng') :
                        (LocalStorageObject.getItem('lng')?LocalStorageObject.getItem('lng'):""),
            'market-type-id':req.headers.get('market') ? req.headers.get('market') :
            (LocalStorageObject.getItem('market')?LocalStorageObject.getItem('market'):""),
            'os':navigator.platform,

          })
        });

        return next
            .handle(authReq)
            .do((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    if (ev.body.status_code === 401) {
                        console.log('hi');
                        this.appService.logedIn = false;
                        LocalStorageObject.removeItem('user');
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
