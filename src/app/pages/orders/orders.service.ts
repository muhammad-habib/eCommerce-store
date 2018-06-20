import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class OrdersService {

    private url = environment.API_ENDPOINT;
    constructor(private http: HttpClient) { }

    public getOrders(user, filter): Observable<any[]> {
        // Initialize Params Object
        let params = new HttpParams();
        if ( localStorage.getItem('market') !== '1')
            this.url = this.url+'mini-market/';
        return this.http.get<any[]>(this.url + 'myOrders', { params: params});
    }

    public requestOrder(order){
        return this.http.post<any[]>(this.url + 'app-order-details', order);
    }
    public confirmOrder(order){
        return this.http.post<any[]>(this.url + 'requestOrder', order);
    }
}
