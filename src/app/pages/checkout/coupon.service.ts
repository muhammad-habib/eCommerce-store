import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CouponService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public validateCoupon(coupon,order_total_price): Observable<any[]>{
    return this.http.post<any[]>(this.url + 'validateCoupon',{
        "typeOfMarket":localStorage.getItem('market')||1,
        "total_price":order_total_price,
        "coupon_name":coupon
    });
  }
 
}
