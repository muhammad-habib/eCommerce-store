import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { MapService } from '../../shared/map/map.service'
import { PaymentMethodsService } from './payment-methods.service'
import { ProductsUnAvailableOptionsService } from './products-un-available-options.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MapService,PaymentMethodsService,ProductsUnAvailableOptionsService]
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  deliveryAddressForm: FormGroup;
  timeSlotsForm:FormGroup;
  paymentMethodForm: FormGroup;
  paymentForm: FormGroup;
  productNotFoundForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  formatted_address="";
  timeSlot=1; 
  public paymentMethods=[];
  public productsUnAvailableOptions=[];
  constructor(public appService:AppService, 
              public formBuilder: FormBuilder,
              private paymentMethodsService:PaymentMethodsService,
              private productsUnAvailableOptionsService:ProductsUnAvailableOptionsService,
              private mapService:MapService) { }

  ngOnInit() {    

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
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.deliveryAddressForm = this.formBuilder.group({
      address: ['']
    });
    this.timeSlotsForm = this.formBuilder.group({
    });

    this.paymentMethodForm = this.formBuilder.group({
      paymentMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
    this.productNotFoundForm = this.formBuilder.group({

    })
  }

  public placeOrder(){
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;
  }

  selectTimeSlot(id){
    this.timeSlot = id ; 
    this.horizontalStepper.next();
  }
}
