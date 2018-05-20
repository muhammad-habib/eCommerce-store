import {Component,OnInit} from '@angular/core';
import {OrdersService} from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit {

    public orders: any;
    constructor(private ordersSerivce:OrdersService) { }

    ngOnInit() {
        this.getAllOrders();
    }

    public getAllOrders(){
        this.ordersSerivce.getOrders().subscribe(data=> {
            this.orders = data['data']['data'];
            console.log(this.orders);
        });
    }

}
