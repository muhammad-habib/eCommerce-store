import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class MyAccountService {

  constructor(private http: HttpClient,) { }

  private url = environment.API_ENDPOINT;

  getUserInfo() {
    return this.http.get(this.url+'get-user');
  }

  updateUserInfo(user) {
      return this.http.post(this.url+'editProfile', user);
  }

}
