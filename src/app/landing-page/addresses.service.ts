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

  public getAddress(lat,lng){
    return this.http.post<any[]>(this.url + 'locationInfo',{longitude:lng,latitude:lat});  }

  public saveNewAddress(coords, name, desc=null) {
      return this.http.post(this.url + "saveLocation", {
        deviceId: localStorage.getItem("device_id"),
        longitude: coords.lng,
        latitude: coords.lat,
        name: name
      });
    }

  public deleteAddress(location_id){
    return this.http.get(this.url + "deleteLocation?locationId="+location_id+'&deviceId='+localStorage.getItem("device_id") );
  }  
  



  }
