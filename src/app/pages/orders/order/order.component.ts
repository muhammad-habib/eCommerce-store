import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from './order.service';
import {Order} from '../../../models/Order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers:[OrderService]
})
export class OrderComponent implements OnInit {

  private sub: any;
  public order: Order;
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
      this.sub = this.activatedRoute.params.subscribe(params => {
          this.getOrder(params['id']);
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
