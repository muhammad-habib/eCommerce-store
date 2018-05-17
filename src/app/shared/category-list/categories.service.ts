import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CategoiesService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getCategoies(): Observable<any[]>{
      return this.http.get<any[]>(this.url + 'categories');
    // return this.http.get<any[]>('http://admin.zadfresh.com/api/products');
  }

}
