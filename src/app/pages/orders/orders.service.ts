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
        params = params.append('user_id', user.id).append('page', filter.page);
        return this.http.get<any[]>(this.url + 'myOrders', { params: params});
    }

    public requestOrder(order){
        let link =(Number(localStorage.getItem('market'))==1)? 'app-order-details':'mini-market/order-details'        
        return this.http.post<any[]>(this.url + link, order);
    }
    public confirmOrder(order){
        let link =(Number(localStorage.getItem('market'))==1)? 'requestOrder':'mini-market/requestOrder'        
        return this.http.post<any[]>(this.url + link, order);
    }
}
