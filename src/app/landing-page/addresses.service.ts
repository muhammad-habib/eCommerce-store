import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';


@Injectable()
export class AddressesService {
  
  private url = environment.API_ENDPOINT;

  constructor(public http:HttpClient, public snackBar: MatSnackBar) { }

  public getAddresses(): Observable<any[]>{
    return this.http.get<any[]>(this.url + 'getSavedLocations?deviceId='+localStorage.getItem('device_id'));

  }
  public lol(){
    return 55; 
  }
}
