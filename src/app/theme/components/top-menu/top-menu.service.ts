import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../models/User.model';

@Injectable()
export class TopMenuService {

    constructor(private http: HttpClient) { }

    private url = environment.API_ENDPOINT;

    getUser(id): Observable<User> {
        let params = new HttpParams();
        params = params.append('userId', id);
        return this.http.get<User>(this.url+'get-user', { params: params});
    }
}
