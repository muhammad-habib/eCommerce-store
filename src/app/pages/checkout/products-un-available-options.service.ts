import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsUnAvailableOptionsService {
  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getProductsUnAvailableOptions(): Observable<any[]>{
    return this.http.get<any[]>(this.url + 'app-settings/product-availability-options');
  }

}
