import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class MyWalletService {

    constructor(private http: HttpClient,) { }

    private url = environment.API_ENDPOINT;

    getUserWallet(filter) {
        // Initialize Params Object
        let params = new HttpParams();
        params = params.append('page', filter.page);
        return this.http.get(this.url+'my-wallet', { params: params});
    }

}
