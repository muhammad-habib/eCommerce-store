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
  public orderStatus: number;
  orderStatuses: any = {
      'canceled' : 4,
      'received' : 0,
      'prepared' : 1,
      'on_the_way' : 2,
      'delivered' : 3
  } ;
  constructor(private _formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
      this.orderStatus = 0;
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
        switch (this.order.status.id) {
            case 1:
               this.orderStatus =  this.orderStatuses.received;
                break;
            case 2:
               this.orderStatus =  this.orderStatuses.prepared;
                break;
            case 9:
               this.orderStatus =  this.orderStatuses.prepared;
                break;
            case 10:
               this.orderStatus =  this.orderStatuses.prepared;
                break;
            case 11:
               this.orderStatus =  this.orderStatuses.prepared;
                break;
            case 4:
               this.orderStatus =  this.orderStatuses.on_the_way;
                break;
            case 5:
               this.orderStatus =  this.orderStatuses.delivered;
                break;
            case 6:
                this.orderStatus =  this.orderStatuses.canceled;
                break;
            case 7:
                this.orderStatus =  this.orderStatuses.canceled;
                break;
            case 8:
                this.orderStatus =  this.orderStatuses.canceled;
                break;
        }
        console.log(this.orderStatus, this.order);
    });
  }


}
