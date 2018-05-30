import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class MarketsService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getMarkets(): Observable<any[]>{
    // console.log(long);
//    return this.http.get<any[]>(this.url + 'markets',{headers: new HttpHeaders({lat:lat,long:long})});
    return this.http.get<any[]>(this.url + 'markets');
  }

}
