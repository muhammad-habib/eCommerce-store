import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class OrdersService {

    private url = environment.API_ENDPOINT;
    constructor(private http: HttpClient) { }

    public getOrders(user): Observable<any[]> {
        // Initialize Params Object
        let params = new HttpParams();
        params = params.append('user_id', user.id);
        return this.http.get<any[]>(this.url + 'myOrders', { params: params});
    }


}
