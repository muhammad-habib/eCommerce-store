import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class SmsDialogService {

  constructor(private http: HttpClient) { }

    private url = environment.API_ENDPOINT;

    submitCode(user) {
    return this.http.post(this.url+'/submitCode' , user);
  }

}
