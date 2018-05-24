import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class OrderService {

    private url = environment.API_ENDPOINT;
    constructor(private http: HttpClient) { }

    public getOrder(user, id): Observable<any[]> {
        // Initialize Params Object
        let params = new HttpParams();
        params = params.append('userId', user.id).append('order_id', id);
        return this.http.get<any[]>(this.url + 'myOrder', { params: params});
    }

}
