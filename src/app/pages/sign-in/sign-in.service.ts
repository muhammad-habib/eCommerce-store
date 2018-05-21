import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable()
export class SignInService {

  constructor(private http: HttpClient,) { }

  private url = environment.API_ENDPOINT;

  register(user) {
   return this.http.post(this.url+'register' , user);
  }

  signIn(user) {
        return this.http.post(this.url+'login' , user);
    }

  countriesCodes() {
      return this.http.get(this.url+'app-settings/country-codes' );
  }
}
