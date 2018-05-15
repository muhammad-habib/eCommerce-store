import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SmsDialogService {

  constructor(private http: HttpClient) { }

    submitCode(user) {
    return this.http.post('https://localhost/zadfresh/public/api/submitCode' , user);
  }

}
