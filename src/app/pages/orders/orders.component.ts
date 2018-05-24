import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {OrdersService} from './orders.service';
import {Order} from '../../models/Order.model';
import {VirtualScrollComponent} from 'angular2-virtual-scroll';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit {

    public orders: Array<Order> = [];
    public viewType: string = 'grid';
    public viewCol: number = 25;
    @ViewChild('sidenav') sidenav: any;
    public sidenavOpen:boolean = true;
    public filter = {};
    public current = 1;
    public lastPage;
    public total;
    public loading=false;

    @ViewChild(VirtualScrollComponent)
    private virtualScroll: VirtualScrollComponent;

    constructor(private ordersSerivce:OrdersService,private spinner: NgxSpinnerService) { }

    ngOnInit() {

        if(window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        if(window.innerWidth < 1280){
            this.viewCol = 33.3;
        }
        this.getAllOrders();
    }

    public getAllOrders() {
        this.spinner.show();
        let user = JSON.parse(localStorage.getItem('user'));
        this.ordersSerivce.getOrders(user, this.filter).subscribe(data=> {
            this.orders = this.orders.concat(data['data']['data']);
            this.current = data['data']['current_page'];
            // console.log(res.shoppers.current_page);
            this.total = data['data']['total'];
            this.lastPage = data['data']['last_page'];
            this.spinner.hide();
            console.log(data['data']);
        }
            ,err=>{
                this.spinner.hide();
            }
        );
    }

    public changeViewType(viewType, viewCol){
        this.viewType = viewType;
        this.viewCol = viewCol;
    }

    @HostListener('window:resize')
    public onWindowResize():void {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
        (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
    }


    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        // In chrome and some browser scroll is given to body tag
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (this.current >= this.lastPage) {
            return;
        }
        if(pos >= max )   {
            this.filter['page']= ++this.current ;
            this.getAllOrders();
        }
    }

}
