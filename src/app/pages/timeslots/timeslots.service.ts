import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class TimeslotsService {

  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient) { }

  public getTimeSlots( ): Observable<any[]>{
    return this.http.get<any[]>(this.url+'v1/timeSlots?latitude='
                + localStorage.getItem('lat')+"&longitude="+localStorage.getItem('lng') );
  }


}
