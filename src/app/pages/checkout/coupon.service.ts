import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CouponService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public validateCoupon(coupon): Observable<any[]>{
    return this.http.post<any[]>(this.url + 'api/validateCoupon',{
        "typeOfMarket":localStorage.getItem('market')||1,
        "total_price":55,
        "coupon_name":coupon
    });
  }
 
}
