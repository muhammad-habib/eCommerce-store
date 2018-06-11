import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { MapService } from '../../shared/map/map.service'
import { PaymentMethodsService } from './payment-methods.service'
import { ProductsUnAvailableOptionsService } from './products-un-available-options.service'
import { CouponService } from './coupon.service'
import { MatSnackBar } from '@angular/material';
import { OrdersService } from '../orders/orders.service'


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MapService,PaymentMethodsService,OrdersService,
              ProductsUnAvailableOptionsService,CouponService]
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  deliveryAddressForm: FormGroup;
  timeSlotsForm:FormGroup;
  paymentMethodForm: FormGroup;
  paymentForm: FormGroup;
  productNotFoundForm: FormGroup;
  couponForm:FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  formatted_address="";
  timeSlot; 
  addressCoor={latitude:null,longitude:null};
  lang="en";
  coupon;
  vat_rate="";
  coupon_message="";
  products=[];
  selectselectTimeSlot;
  public paymentMethods=[];
  public productsUnAvailableOptions=[];
  constructor(public appService:AppService, public snackBar: MatSnackBar,
              public formBuilder: FormBuilder, private couponService:CouponService,
              private paymentMethodsService:PaymentMethodsService,private ordersService:OrdersService,
              private productsUnAvailableOptionsService:ProductsUnAvailableOptionsService,
              private mapService:MapService) { }

  ngOnInit() {    
    this.addressCoor['latitude' ] = localStorage.getItem('lat');
    this.addressCoor['longitude'] = localStorage.getItem('lng');
    this.lang = localStorage.getItem('lang');
    this.mapService.getGeoCode({'lat':localStorage.getItem('lat'),'lng':localStorage.getItem('lng')}).subscribe(
      res=>{
          if(res['results'] && res['results'][0] && res['results'][0]['formatted_address'])
              this.formatted_address = res['results'][0]['formatted_address']  
      }
    );        

    this.paymentMethodsService.getPaymentMethods().subscribe(
      res=>this.paymentMethods = res['data']
    )
    this.productsUnAvailableOptionsService.getProductsUnAvailableOptions().subscribe(
      res=>{ this.productsUnAvailableOptions = res['data'] ;}
    )
    this.deliveryAddressForm = this.formBuilder.group({
//      address: ['']
    });
    this.timeSlotsForm = this.formBuilder.group({

    });

    this.paymentMethodForm = this.formBuilder.group({
      paymentsFCN: new FormControl()
    });
    this.productNotFoundForm = this.formBuilder.group({
      productNotFoundFCN:new FormControl()
    });

    this.couponForm = this.formBuilder.group({
      couponFCN: new FormControl()
    });
  

  }

  public placeOrder(){
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
  }

  selectTimeSlot(slot){
    this.timeSlot = slot ; 
    this.horizontalStepper.next();
  }
  addCoupon(){
    this.coupon_message="";
    this.couponService.validateCoupon(this.coupon,this.appService.cartTotalPrice)
        .subscribe(res =>{
          let status ; 
            if(res['success']){
              status = 'success'
            } 
            else{
              status = 'error'
            }
        this.coupon_message=res['message'];          
        this.snackBar.open(res['message'], '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        },
        err=>{}
       )
  }

  requestOrder(){
    this.products=[];
    let order={};
    order['timeSlot'] = this.timeSlot;
    order['vat_rate'] = this.vat_rate;
    order['coupon']= this.coupon;
    this.appService.cartMap.forEach(element => {
      element.product.count = element.count;
      this.products.push(element.product);
    });
    order['products'] = this.products;
    console.log(order);
    return  ;
    // this.ordersService.requestOrder(order).subscribe(
    //   res => {},
    //   err=>{}
    // );
  }
}
