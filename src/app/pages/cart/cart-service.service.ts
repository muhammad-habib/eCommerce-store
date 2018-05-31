import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CartServiceService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getProducts(products): Observable<any[]>{
    console.log(products);
    let link = "list-of-products";  
    return this.http.post<any[]>(this.url + link,{products:products});
    // return this.http.get<any[]>('http://admin.zadfresh.com/api/products');
  }
}
