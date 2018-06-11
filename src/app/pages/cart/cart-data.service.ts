import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class CartDataService {

  private messageSource = new BehaviorSubject(new Map());
  cart = this.messageSource.asObservable();

  constructor() { }

  changeCart(map: Map<any,any>) {
    this.messageSource.next(map)
  }
}
