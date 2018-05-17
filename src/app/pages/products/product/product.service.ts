import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ProductService {

  private url = environment.API_ENDPOINT;
  constructor(
      private http: HttpClient
  ) { }

  getProduct(id) {
    return this.http.get(this.url+'/product?product_id='+id);
  }

}
