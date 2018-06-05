import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class LanguagesService {

    constructor(private http: HttpClient,) { }

    private url = environment.API_ENDPOINT;

    changeLanguage(slug) {
        console.log(slug);
        let params = new HttpParams();
        params = params.append('lang', slug);
        return this.http.post(this.url+'editProfile', params);
    }

}
