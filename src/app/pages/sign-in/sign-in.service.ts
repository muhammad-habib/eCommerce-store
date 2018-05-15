import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class SignInService {

  constructor(private http: HttpClient,) { }


  register(user) {
   return this.http.post('https://localhost/zadfresh/public/api/register' , user);
  }
}
