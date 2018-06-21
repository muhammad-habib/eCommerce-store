import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SearchService {

    private url = environment.API_ENDPOINT;
    constructor(
        private http: HttpClient
    ) { }


}
