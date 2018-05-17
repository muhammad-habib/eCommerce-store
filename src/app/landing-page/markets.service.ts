import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class MarketsService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getMarkets(): Observable<any[]>{
    return this.http.get<any[]>(this.url + 'getMarkets?deviceId='+localStorage.getItem('device_id'));
  }

}
