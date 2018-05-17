import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoriesService {
  
  
  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getCategories( hyper , market ): Observable<any[]>{
    let link = hyper==1?"categories":"mini-market/categories?market_type_id="+market;  
      return this.http.get<any[]>(this.url + link);
    // return this.http.get<any[]>('http://admin.zadfresh.com/api/products');
  }

  public getSubCategories( hyper , category ): Observable<any[]>{
    let link = hyper==1?"subCategories":"subCategories/categories";  
      return this.http.get<any[]>(this.url + link+"?category_id="+category);
    // return this.http.get<any[]>('http://admin.zadfresh.com/api/products');
  }
  
}
