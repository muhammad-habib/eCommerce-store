import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from './order.service';
import {Order} from '../../../models/Order.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers:[OrderService]
})
export class OrderComponent implements OnInit {

  private sub: any;
  public order: Order;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  orderStatus: any = {
      'received' : 1,
      'prepared' : 2,
      'on_the_way' : 3,
      'delivered' : 4
  } ;
  constructor(private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
      this.sub = this.activatedRoute.params.subscribe(params => {
          this.getOrder(params['id']);
      });

      this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
          secondCtrl: ['', Validators.required]
      });
  }


  private getOrder(id) {
    let user = JSON.parse(localStorage.getItem('user'));
    this.orderService.getOrder(user, id).subscribe(data=> {
        this.order = data['data'];
        console.log(this.order);
    });
  }

}
