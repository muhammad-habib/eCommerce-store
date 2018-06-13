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
        if ( localStorage.getItem('market') == 1)
        {
            params = params.append('user_id', user.id).append('page', filter.page);
            return this.http.get<any[]>(this.url + 'myOrders', { params: params});
        } else {
            params = params.append('user_id', user.id)
                .append('page', filter.page)
                .append('market_type_id', filter.market_type_id);
            return this.http.get<any[]>(this.url + 'mini-market/myOrders', { params: params});
        }
    }

    public requestOrder(order){
        return this.http.post<any[]>(this.url + 'app-order-details', order);
    }
    public confirmOrder(order){
        return this.http.post<any[]>(this.url + 'requestOrder', order);
    }
}
