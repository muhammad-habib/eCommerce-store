import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../models/User.model';

@Injectable()
export class TopMenuService {

    constructor(private http: HttpClient) { }

}
