import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getProducts( hyper , market ,filter ,isOffers ): Observable<any[]>{
    let link="";
    if(isOffers)
        link = market==1?"offers?":"mini-market/offers?market_type_id="+market+"&";  
      else
        link = market==1?"products?":"mini-market/products?market_type_id="+market+"&";  
      return this.http.get<any[]>(this.url + link + this.filterToQuery(filter));
    // return this.http.get<any[]>('http://admin.zadfresh.com/api/products');
  }

  private  filterToQuery(filter):string {
    let queryString="";
    for (let key of Object.keys(filter)){
      if(filter[key]!=-1 && filter[key]!=null){
        queryString+="&"+key+"="+filter[key];
        }
    }
    return queryString;
  }


  public getOffersAds(){
    return this.http.get<any[]>(this.url + "offers-ads");
  }

  searchProducts(query) {
    return this.http.get(this.url+'product-search?query='+query);
  }

}
