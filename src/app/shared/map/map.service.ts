import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageObject } from '../../locale-storage'

@Injectable()
export class MapService {

  constructor(public http:HttpClient) { }
  private url ="https://maps.googleapis.com/maps/api/geocode/json" 
  getGeoCode(coords){
    let lang =LocalStorageObject.getItem('lang') || 'en';
    return this.http.get<any[]>(this.url+"?latlng="
      +coords.lat+","+coords.lng+"&sensor=true&language="+lang+"&key=AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE"
    ,{headers: new HttpHeaders({'external_link':'1'})});    
  }
}
