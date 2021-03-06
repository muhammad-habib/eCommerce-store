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
import { WalletService } from './wallet.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { Location} from '@angular/common';
import { TranslatePipe } from '../../shared/translate.pipe'
import { LocalStorageObject } from '../../locale-storage'

// import { element } from 'protractor';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MapService,PaymentMethodsService,OrdersService,WalletService,TranslatePipe,
              ProductsUnAvailableOptionsService,CouponService]
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  deliveryAddressForm: FormGroup;
  timeSlotsForm:FormGroup;
  paymentMethodForm: FormGroup;
  productNotFoundForm: FormGroup;
  couponForm:FormGroup;
  walletItemsForm:FormGroup;
  confirmationMesssage;
  orderId;
  market_type = 1 ;


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
  valid_coupon="";
  vat_rate=5;
  coupon_message="";
  products=[];
  orderDetails=[];
  selected_method;
  selectedProductsUnAvailableOptions;
  public paymentMethods=[];
  public productsUnAvailableOptions=[];
  public walletItems = [];
  constructor(public appService:AppService, public snackBar: MatSnackBar, public walletService:WalletService,
              public formBuilder: FormBuilder, private couponService:CouponService,private _location: Location,
              private paymentMethodsService:PaymentMethodsService,private ordersService:OrdersService,
              private productsUnAvailableOptionsService:ProductsUnAvailableOptionsService,
              private mapService:MapService,private spinner: NgxSpinnerService,private translatePipe:TranslatePipe) {
              }

  ngOnInit() {
    let seklectedMarket = JSON.parse(LocalStorageObject.getItem('selectedMarket'));  
    this.minimum_order_price = seklectedMarket.minimum_order_price;
    this.vat_rate = seklectedMarket.vat_rate;

    this.checkOrderPrice();
    this.market_type = Number(LocalStorageObject.getItem('market'))||1;  
    this.addressCoor['latitude' ] = LocalStorageObject.getItem('lat');
    this.addressCoor['longitude'] = LocalStorageObject.getItem('lng');
    this.lang = LocalStorageObject.getItem('lang');
    this.mapService.getGeoCode({'lat':LocalStorageObject.getItem('lat'),'lng':LocalStorageObject.getItem('lng')}).subscribe(
      res=>{
          if(res['results'] && res['results'][0] && res['results'][0]['formatted_address'])
              this.formatted_address = res['results'][0]['formatted_address']  
      }
    );        

    this.walletService.getWalletItems().subscribe(res=>{
      this.walletItems = res['data']['items']['data'];      
    },
    err=>{

    })

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
      paymentsCtrl: new FormControl()
    });
    this.productNotFoundForm = this.formBuilder.group({
      productNotFoundFCN:new FormControl()
    });

    this.couponForm = this.formBuilder.group({
      couponFCN: new FormControl()
    });
    this.walletItemsForm = this.formBuilder.group({
      walletItemFCN: new FormControl()
    })

  }

  public placeOrder(){
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.confirmOrder();
  }

  selectTimeSlot(slot){
    this.timeSlot = slot ; 
    this.horizontalStepper.next();
  }
  addCoupon(){
    this.coupon_message="";
    this.valid_coupon = "";
    this.couponService.validateCoupon(this.coupon,this.appService.cartTotalPrice)
        .subscribe(res =>{
          let status ; 
            if(res['success']){
              status = 'success'
              this.valid_coupon = this.coupon;
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
    order['coupon']= this.valid_coupon;
    if(! this.valid_coupon && this.walletItemsForm.value.walletItemFCN)
      order['wallet_item'] = this.walletItemsForm.value.walletItemFCN.id,
  
    this.appService.cartMap.forEach(element => {
      element.product.count = element.count;
      this.products.push(element.product);
    });
    order['products'] = this.products;
    this.spinner.show();
    this.ordersService.requestOrder(order).subscribe(
      res => {
        this.orderDetails = res['data'];
        console.log(res);
        this.spinner.hide();
      },
      err=>{
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  changeStep(e){
    // this.horizontalStepper.selectedIndex = 1;
    // this.verticalStepper.selectedIndex = 1;
    // this.horizontalStepper.next();
    if(e.selectedIndex==(this.horizontalStepper._steps.length-2)){

        if(! this.timeSlot && this.market_type==1){
          this.moveToStep(this.translatePipe.transform('TIMESLOT_REQUIRED'),'error',1);
          return ;
        }
        if(! this.paymentMethodForm.value.paymentsCtrl ){
          this.moveToStep(this.translatePipe.transform('METHOD_REQUIRED'),'error',this.market_type==1?2:1);
          return ;
        }
        if(! this.productNotFoundForm.value.productNotFoundFCN && this.market_type==1){
          this.moveToStep(this.translatePipe.transform('PRODUCT_NOT_FOUND_REQUIRED'),'error',3);
          return ;
        }

        this.requestOrder();
      }
  }
  confirmOrder(){
    this.spinner.show();
    let order = this.prepareOrder();
    this.ordersService.confirmOrder(order).subscribe(
      res=>{
        if(res['success']){
          this.appService.cartMap.clear();
          this.appService.refreshCart();
          this.horizontalStepper.next();
          this.confirmationMesssage = res['message'];
          this.orderId = res['orderId'];
        }
        this.snackBar.open(res['message'], '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        this.spinner.hide();
      },
      err=>{
        console.log(err);        
        this.spinner.hide();
      }
    )
  }

  public orderDetailsTemp=[{"id":1,"key":"order_price","label_ar":"قيمة الطلب","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"Order Price","sorting":1,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":0,"value":50},{"id":2,"key":"DeliveryCharge","label_ar":"قيمة التوصيل","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"Delivery Fees","sorting":2,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":0,"value":9},{"id":3,"key":"vat_rate","label_ar":"نسبة ضريبة القيمة المضافة","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"VAT Percentage","sorting":3,"text":null,"currency_ar":"٪","currency_en":"%","hidden":0,"value":5},{"id":7,"key":"user_wallet_cash","label_ar":"رصيد مستحق من المحفظة","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"Balance due from the Wallet","sorting":4,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":0,"value":0},{"id":4,"key":"vat_value","label_ar":"ضريبة القيمة المضافة","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"VAT","sorting":5,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":0,"value":2.95},{"id":5,"key":"discount","label_ar":"الخصم","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"Discount","sorting":6,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":0,"value":0},{"id":6,"key":"total_price","label_ar":"السعر النهائي","color":"#4DB114","background_color":"#E2EFDB","updated_at":null,"created_at":null,"label_en":"Total","sorting":7,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":0,"value":61.95},{"id":8,"key":"wallet_item_id","label_ar":"رقم بند المحفظة","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"wallet Item number","sorting":8,"text":null,"currency_ar":"#","currency_en":null,"hidden":1,"value":0},{"id":9,"key":"express_EAT","label_ar":"الوقت المتوقع للتوصيل","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"Expected Arrival Time","sorting":9,"text":null,"currency_ar":null,"currency_en":null,"hidden":1},{"id":10,"key":"discount_reason","label_ar":"سبب الخصم","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"Discount reason","sorting":10,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":1,"value":null},{"id":11,"key":"original_order_price","label_ar":"قيمة الطلب الاصلية","color":null,"background_color":null,"updated_at":null,"created_at":null,"label_en":"Original Order Price","sorting":11,"text":null,"currency_ar":"ريال","currency_en":"SR","hidden":1,"value":50}];

  prepareOrder(){
    let order= {      
        "longitude": LocalStorageObject.getItem('lng'),
        "latitude": LocalStorageObject.getItem('lat'),
        "address": this.formatted_address,
        "timeSlots": this.timeSlot.id,
        "typeOfMarket": LocalStorageObject.getItem('market'),
        "paymentType": this.paymentMethodForm.value.paymentsCtrl.id,
        "replace_products":this.productNotFoundForm.value.productNotFoundFCN.id         
      }
    ;

    this.orderDetails.forEach(element=>{
      if(!element.hidden)
        order[element.key] = element.value;
    })

    let products=[];
    this.appService.cartMap.forEach(element => {
      products.push(
        {
          "productId": element.product.id,
          "productCount": element.count,
          "ProductNotes": "",
          "productPrice": element.product.price
        }
      );
    });
    order['products'] = products;
    console.log(order);
    return order;
  }

  move(index: number) {
    this.verticalStepper.selectedIndex = index;
    this.horizontalStepper.selectedIndex = index;
  }

  moveToStep(message,status,index){
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    setTimeout(() => {
      this.move(index);
    }, 100);

  }

  public minimum_order_price=0; 
  checkOrderPrice(){
    if(this.appService.cartTotalPrice < this.minimum_order_price){
      this.snackBar.open('CART_MINIMUM', '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
      this._location.back();
    }
  }

}
